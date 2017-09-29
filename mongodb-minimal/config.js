/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const database = require('bedrock-mongodb');

// custom atabase configuration
bedrock.config.mongodb.name = 'mongodb-minimal'; // default: bedrock_dev
bedrock.config.mongodb.host = 'localhost';       // default: localhost
bedrock.config.mongodb.port = 27017;             // default: 27017
bedrock.config.mongodb.username = 'bedrock';     // default: bedrock
bedrock.config.mongodb.password = 'password';    // default: password

// alternatively, use `mongodb` URL format:
// bedrock.config.mongodb.url = 'mongodb://localhost:27017/mongodb-minimal';

// enable local collection if a local database is available
bedrock.config.mongodb.local.enable = true;

// open some collections once the database is ready
bedrock.events.on('bedrock-mongodb.ready', function(callback) {
  database.openCollections(['testcollection'], function(err) {
    if(err) {
      return callback(err);
    }
  });
});
