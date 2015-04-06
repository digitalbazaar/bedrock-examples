var bedrock = require('bedrock');
var path = require('path');

// modules
require('bedrock-express');

// frontend configuration
require('bedrock-requirejs');
require('bedrock-server');

require('bedrock-views');

bedrock.config.views.paths.push(
  path.join(__dirname)
);


// add pseudo bower package
bedrock.config.requirejs.bower.packages.push({
  path: path.join(__dirname, 'example'),
  manifest: {
    name: 'example',
    moduleType: 'amd',
    main: './form.js',
    dependencies: {
      angular: '~1.3.0'
    }
  }
});

// backend configuration
var database = require('bedrock-mongodb');

// custom configuration
bedrock.config.mongodb.name = 'bedrock_rest_dev'; // default: bedrock_dev
bedrock.config.mongodb.host = 'localhost';        // default: localhost
bedrock.config.mongodb.port = 27017;              // default: 27017
bedrock.config.mongodb.username = 'bedrock_rest'; // default: bedrock
bedrock.config.mongodb.password = 'password';     // default: password

// the mongodb database 'bedrock_rest_dev' and the 'bedrock_rest' user will
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
    database.collections.people.find({}).toArray(function(err, docs){
      res.send(docs);
    });
  });

  app.post('/people/:name', function(req, res) {
    database.collections.people.insert(
      [{name: req.param('name')}], function(err, result) {
        res.send(result.result);
      });
  });

  app.delete('/people/:name', function(req, res) {
    database.collections.people.remove(
      {name: req.param('name')}, function(err, result) {
        res.send(result.result);
      });
  });
});

bedrock.start();
