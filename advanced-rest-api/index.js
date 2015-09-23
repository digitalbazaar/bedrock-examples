/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var config = bedrock.config;
var path = require('path');
var BedrockError = bedrock.util.BedrockError;
var jsonld = require('jsonld');
var async = require('async');
var validate = require('bedrock-validation').validate;
var brIdentity = require('bedrock-identity');
var brPermission = require('bedrock-permission');
var ensureAuthenticated = require('bedrock-passport').ensureAuthenticated;
var database = require('bedrock-mongodb');
var permissions = config.permission.permissions;

// load configuration and demo data
require('./configs/config');
var identities = config.demo.identities;
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
  app.get('/people', function(req, res) {
    database.collections.people.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });

  app.post('/people/:name', function(req, res, next) {
    var response = {};
    async.waterfall([
      function(callback) {
        response.body = req.body;
        jsonld.frame(
          req.body, {'@context': 'http://schema.org', '@type': 'Person'},
          callback);
      },
      function(result, callback) {
        response.framed = result;
        response.valid = validate('person', result['@graph'][0]);
        callback(null);
      }
    ], function(err) {
      if(err) {
        return next(err);
      }
      res.send(response);
    });
  });

  app.delete('/people/:name', ensureAuthenticated, function(req, res, next) {
    // req.user.identity contains information about the authenticated user
    var actor = {id: req.user.identity.id};
    brIdentity.checkPermission(
      actor, permissions.PERSON_DELETE, function(err) {
        if(err) {
          return next(
            new BedrockError(
              'Insufficient Privileges',
              'InsufficientPrivileges', {
                'public': true,
                httpStatusCode: 403,
                details: {
                  authenticatedUser: req.user.identity.id
                }
              }));
        }
        res.status = 200;
        res.send({
          status: 'success',
          authenticatedUser: req.user.identity.id
        });
      });
  });
});

// Insert identities and public keys used for testing into database
function insertTestData(done) {
  async.forEachOf(identities, function(identity, key, callbackA) {
    async.parallel([
      function(callback) {
        brIdentity.insert(null, identity.identity, callback);
      },
      function(callback) {
        brIdentity.addPublicKey(null, identity.keys.publicKey, callback);
      }
    ], callbackA);
  }, function(err) {
    if(err) {
      if(!database.isDuplicateError(err)) {
        // duplicate error means test data is already loaded
        return done(err);
      }
    }
    done();
  });
}

bedrock.start();
