// modules
var bedrock = require('bedrock');
var database = require('bedrock-mongodb');
require('bedrock-express');

// custom configuration
bedrock.config.mongodb.name = 'bedrock_rest_dev'; // default: bedrock_dev
bedrock.config.mongodb.host = 'localhost';      // default: localhost
bedrock.config.mongodb.port = 27017;            // default: 27017
bedrock.config.mongodb.username = 'bedrock_rest'; // default: bedrock
bedrock.config.mongodb.password = 'password';   // default: password

// the mongodb database 'my_project_dev' and the 'my_project' user will
// be created on start up following a prompt for the admin user credentials

bedrock.events.on('bedrock-mongodb.ready', function(callback) {
  database.openCollections(['users'], function(err) {
    if(err) {
      return callback(err);
    }
    callback();
  });
});

bedrock.events.on('bedrock-express.configure.routes', function(app) {
  app.get('/users', function(req, res){
    database.collections.users.find({}).toArray(function(err, docs){
      res.send(docs);
    });
  }).post('/users/:name', function(req, res){
    database.collections.users.insert([{name: req.param("name")}],
     function(err, result){
      res.send(result.result);
    });
  }).delete('/users/:name', function(req, res){
    database.collections.users.remove({name: req.param("name")},
      function(err, result){
        res.send(result.result);
    });
  });
});

bedrock.start();
