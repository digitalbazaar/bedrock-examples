/*!
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
var bedrock = require('bedrock');
var path = require('path');
var config = bedrock.config;

// modules
require('bedrock-express');

// frontend configuration
require('bedrock-requirejs');
require('bedrock-server');
require('bedrock-views');

// basic-rest-api pseudo bower package
var rootPath = path.join(__dirname);
config.requirejs.bower.packages.push({
  path: path.join(rootPath, 'example'),
  manifest: path.join(rootPath, 'bower.json')
});

// backend configuration
var database = require('bedrock-mongodb');

// MongoDB Configuration
// the MongoDB database 'bedrock_basic_rest_dev' and the 'bedrock_rest' user
// will be created on start up following a prompt for the admin user credentials
bedrock.config.mongodb.name = 'bedrock_basic_rest_dev'; // default: bedrock_dev
bedrock.config.mongodb.host = 'localhost';        // default: localhost
bedrock.config.mongodb.port = 27017;              // default: 27017
bedrock.config.mongodb.username = 'bedrock_basic_rest'; // default: bedrock
bedrock.config.mongodb.password = 'password';     // default: password

// This will create a mongodb collection called people, and expose this
// collection through `database.collections.people`
bedrock.events.on('bedrock-mongodb.ready', function(callback) {
  database.openCollections(['people'], function(err) {
    if(err) {
      return callback(err);
    }
    callback();
  });
});

// This is a bedrock event listener, waiting for the event
// `bedrock-express.configure.routes` to be fired. This event is triggered by
// our bedrock-express module once the express module is ready for routes to
// be added. We add routes to the app object.
bedrock.events.on('bedrock-express.configure.routes', function(app) {
  // Here, we add our different http request types and their corresponding
  // routes to create our rest api.

  // get route to list all the people in our database
  app.get('/people', function(req, res) {
    database.collections.people.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });

  // post route for adding people
  // This route demonstrates the use of a parameter in the route, that can
  // then be accessed by using `req.params.name`.
  app.post('/people/:name', function(req, res) {
    database.collections.people.insert(
      [{name: req.params.name}], function(err, result) {
        res.send(result.result);
      });
  });

  // delete people from the database
  app.delete('/people/:name', function(req, res) {
    database.collections.people.remove(
      {name: req.params.name}, function(err, result) {
        res.send(result.result);
      });
  });
});

bedrock.start();
