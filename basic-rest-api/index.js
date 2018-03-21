/*!
 * Copyright (c) 2014-2018 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
const bedrock = require('bedrock');
const {config} = bedrock;
const database = require('bedrock-mongodb');
require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

require('./config');

// This will create a mongodb collection called people, and expose this
// collection through `database.collections.people`
bedrock.events.on('bedrock-mongodb.ready', callback => {
  database.openCollections(['people'], err => {
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
bedrock.events.on('bedrock-express.configure.routes', app => {
  // Here, we add our different http request types and their corresponding
  // routes to create our rest api.

  // get route to list all the people in our database
  app.get('/people', (req, res, next) => {
    database.collections.people.find({}).toArray((err, docs) => {
      if(err) {
        return next(err);
      }
      res.send(docs);
    });
  });

  // post route for adding people
  // This route demonstrates the use of a parameter in the route, that can
  // then be accessed by using `req.params.name`.
  app.post('/people/:name', (req, res, next) => {
    database.collections.people.insert(
      [{name: req.params.name}], (err, result) => {
        if(err) {
          return next(err);
        }
        res.send(result.result);
      });
  });

  // delete people from the database
  app.delete('/people/:name', (req, res, next) => {
    database.collections.people.remove(
      {name: req.params.name}, (err, result) => {
        if(err) {
          return next(err);
        }
        res.send(result.result);
      });
  });
});

bedrock.start();
