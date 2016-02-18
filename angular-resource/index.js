/*
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var path = require('path');
var config = bedrock.config;

// modules
require('bedrock-express');

// frontend configuration
require('bedrock-server');
require('bedrock-views');

// angular-resource pseudo bower package
var rootPath = path.join(__dirname);
config.requirejs.bower.packages.push({
  path: path.join(rootPath, 'example'),
  manifest: path.join(rootPath, 'bower.json')
});

// backend configuration
var database = require('bedrock-mongodb');

// custom configuration
bedrock.config.mongodb.name = 'bedrock_resource_dev'; // default: bedrock_dev
bedrock.config.mongodb.host = 'localhost';        // default: localhost
bedrock.config.mongodb.port = 27017;              // default: 27017
bedrock.config.mongodb.username = 'bedrock_resource_dev'; // default: bedrock
bedrock.config.mongodb.password = 'password';     // default: password

// the mongodb database 'bedrock_resource_dev' and the 'bedrock_rest' user will
// be created on start up following a prompt for the admin user credentials
bedrock.events.on('bedrock-mongodb.ready', function(callback) {
  database.openCollections(['people'], function(err) {
    if(err) {
      return callback(err);
    }
    callback();
  });
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.get('/people', function(req, res) {
    database.collections.people.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });

  app.post('/people', function(req, res) {
    console.log('mongo inserting: ', req.body.name);

    database.collections.people.insert(
      [{name: req.body.name}],
      function(err, result) {
        res.send(result.result);
      });
  });

  app.delete('/people/:name', function(req, res) {
    database.collections.people.remove(
      {name: req.params.name}, function(err, result) {
        res.send(result.result);
      });
  });
});

bedrock.start();
