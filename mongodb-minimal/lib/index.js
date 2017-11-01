/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const async = require('async');
const bedrock = require('bedrock');
const database = require('bedrock-mongodb');
const uuid = require('uuid/v4');

// load config
require('./config');

// open some collections once the database is ready
bedrock.events.on('bedrock-mongodb.ready', callback => async.auto({
  openCollections: callback =>
    database.openCollections(['mongodb_minimal'], callback),
  removeCollection: ['openCollections', (results, callback) =>
    database.collections.mongodb_minimal.remove(callback)]
}, err => callback(err)));

const docs = [
  {'origin': 'a', 'destination': 'b'},
  {'origin': 'b', 'destination': 'c'},
  {'origin': 'c', 'destination': ['d', 'e', 'g']},
  {'origin': 'd', 'destination': 'e'},
  {'origin': 'e', 'destination': 'f'},
  {'origin': 'f', 'destination': 'g'},
  {'origin': 'g', 'destination': 'h'},
  // {'origin': 'h', 'destination': 'i'},
  // {'origin': 'a', 'destination': 'e'},
];
// const docs = [
//   {'origin': 'a', 'destination': 'b'},
//   {'origin': 'b', 'destination': 'c'},
//   {'origin': 'c', 'destination': 'd'},
//   {'origin': 'd', 'destination': 'e'},
//   {'origin': 'e', 'destination': 'f'},
//   {'origin': 'f', 'destination': 'g'},
//   {'origin': 'g', 'destination': 'h'},
//   {'origin': 'h', 'destination': 'i'},
//   {'origin': 'a', 'destination': 'e'},
// ];

bedrock.events.on('bedrock.started', () => {
  async.auto({
    insert: callback => async.each(docs, (d, callback) =>
      database.collections.mongodb_minimal.insert(d, callback), callback),
    agregate: ['insert', (results, callback) => database.collections
      .mongodb_minimal.aggregate([
        {$match: {origin: 'a'}},
        {
          $graphLookup: {
            from: 'mongodb_minimal',
            startWith: '$destination',
            connectFromField: 'destination',
            connectToField: 'origin',
            depthField: 'numConnections',
            as: 'traverseroute',
            restrictSearchWithMatch: {'destination': {'$ne': 'h'}}
          }
        },
        // {$project: {'_id': 0, 'origin': 1, 'traverseroute': 1}},
        // FIXME: sort doesn't seem to have any effect before/after project
        // {$sort: {'traverseroute.numConnections': 1}},
      ]).toArray((err, result) => {
        console.log('LOCAL-FIND', JSON.stringify(result, null, 2));
        callback();
      })]
  }, err => {
    if(err) {
      console.log('ERROR', err);
    }
    bedrock.exit(err);
  });
});

bedrock.start();
