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
  {mode: ['bike', 'walk'], 'origin': 'a', 'destination': ['b', 'b2', 'b3']},
  {mode: ['bike', 'walk'], 'origin': 'b', 'destination': ['c', 'c2']},
  {mode: 'walk', 'origin': 'b2', 'destination': '1'},
  {mode: ['walk', 'car'], 'origin': 'b3', 'destination': 'ZZ10'},
  {mode: 'car', 'origin': 'c', 'destination': ['d', 'e']},
  {mode: 'walk', 'origin': 'c2', 'destination': 'g'},
  {mode: 'bike', 'origin': 'd', 'destination': 'e'},
  {mode: 'bike', 'origin': 'e', 'destination': 'f'},
  {mode: 'bike', 'origin': 'f', 'destination': 'g'},
  {mode: ['bike', 'walk'], 'origin': 'g', 'destination': 'h'},
  {mode: 'walk', 'origin': '1', 'destination': '2'},
  {mode: ['walk', 'car'], 'origin': '2', 'destination': '3'},
  {mode: 'walk', 'origin': '3', 'destination': '4'},
];

bedrock.events.on('bedrock.started', () => {
  async.auto({
    insert: callback => async.each(docs, (d, callback) =>
      database.collections.mongodb_minimal.insert(d, callback), callback),
    testQuery: ['insert', (results, callback) => database.collections
      .mongodb_minimal.find({
        mode: {
          $not: {$elemMatch: {$exists: 1}},
          $eq: 'walk'
        }
      }).toArray((err, result) => {
        if(err) {
          return callback(err);
        }
        console.log('QQQQQQQQ', JSON.stringify(result, null, 2));
        callback();
      })],
    aggregate: ['insert', (results, callback) => database.collections
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
            restrictSearchWithMatch: {
              // destination: {$ne: 'h'},
              mode: {
                $not: {$elemMatch: {$exists: 1}},
                $eq: 'walk'
              }
            }
          }
        },
        {
          $project: {
            '_id': 0,
            'origin': 1,
            'traverseroute.destination': 1,
            // 'traverseroute.mode': 1
          }
        },
        // FIXME: sort doesn't seem to have any effect before/after project
        // {$sort: {'traverseroute.destination': 1}},
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
