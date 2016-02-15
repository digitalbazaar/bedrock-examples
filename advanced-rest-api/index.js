/*
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var config = bedrock.config;
var BedrockError = bedrock.util.BedrockError;
var jsonld = require('jsonld');
var async = require('async');
var validate = require('bedrock-validation').validate;
var brIdentity = require('bedrock-identity');
var brKey = require('bedrock-key');
var ensureAuthenticated = require('bedrock-passport').ensureAuthenticated;
var database = require('bedrock-mongodb');
var permissions = config.permission.permissions;

// load configuration and demo data
require('./configs/config');

// modules
require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

bedrock.events.on('bedrock-mongodb.ready', function(callback) {
  async.parallel([
    function(callback) {
      database.openCollections(['people'], function(err) {
        if(err) {
          return callback(err);
        }
        callback();
      });
    },
    function(callback) {
      insertTestData(callback);
    }
  ], callback);
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  // get all people
  app.get('/people', function(req, res) {
    database.collections.people.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });

  // add a new person
  app.post('/people', function(req, res, next) {
    var response = {};
    async.waterfall([
      function(callback) {
        response.body = req.body;
        jsonld.frame(
          req.body, {'@context': 'http://schema.org', '@type': 'Person'},
          callback);
      },
      function(framed, callback) {
        response.framed = framed;
        var person = framed['@graph'][0];
        response.valid = validate('person', person);
        if(!response.valid.valid) {
          return callback();
        }
        database.collections.people.insert(person, function(err, result) {
          if(err) {
            return next(err);
          }
          callback();
        });
      }
    ], function(err) {
      if(err) {
        return next(err);
      }
      res.send(response);
    });
  });

  // delete a person
  app.delete('/people/:name', ensureAuthenticated, function(req, res, next) {
    // req.user.identity contains information about the authenticated user
    var actor = {id: req.user.identity.id};
    brIdentity.checkPermission(actor, permissions.PERSON_DELETE, function(err) {
      if(err) {
        return next(new BedrockError(
          'Permission Denied.', 'PermissionDenied', {
            'public': true,
            httpStatusCode: 403,
            details: {authenticatedUser: req.user.identity.id}
          }));
      }
      database.collections.people.remove(
        {name: req.param('name')}, function(err, result) {
        if(err) {
          return next(err);
        }
        res.status(200).send({
          status: 'success',
          authenticatedUser: req.user.identity.id
        });
      });
    });
  });
});

bedrock.start();

// insert identities and public keys used for testing into database
function insertTestData(done) {
  var identities = config.demo.identities;
  async.forEachOf(identities, function(identity, key, callback) {
    async.parallel([
      function(callback) {
        brIdentity.insert(null, identity.identity, callback);
      },
      function(callback) {
        brKey.addPublicKey(null, identity.keys.publicKey, callback);
      }
    ], callback);
  }, function(err) {
    // duplicate error means test data is already loaded and is ignored
    if(err && !database.isDuplicateError(err)) {
      return done(err);
    }
    done();
  });
}
