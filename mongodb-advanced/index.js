const async = require('async');
const bedrock = require('bedrock');
const path = require('path');
const config = bedrock.config;
const database = require('bedrock-mongodb');

require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

// load config
require('./config');

const rootPath = path.join(__dirname);
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});

// open some collections once the database is ready
bedrock.events.on('bedrock-mongodb.ready', callback => async.auto({
  openCollections: callback =>
    database.openCollections(['mongodb_advanced'], callback)
}, err => callback(err)));

bedrock.events.on('bedrock-express.configure.routes', addRoutes);

function addRoutes(app) {
  app.get('/people', (req, res) => {
    database.collections.mongodb_advanced.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });

  app.post('/people/', (req, res) => {
    database.collections.mongodb_advanced.insert(req.body,
      (err, result) => {
        res.send(result.result);
      });
  });

  app.delete('/people/:name', (req, res) => {
    database.collections.mongodb_advanced.remove(
      {name: req.params.name}, (err, result) => {
        res.send(result.result);
      });
  });
}

bedrock.start();
