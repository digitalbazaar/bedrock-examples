/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;

// custom atabase configuration
config.mongodb.name = 'mongodb_minimal'; // default: bedrock_dev
config.mongodb.host = 'localhost'; // default: localhost
config.mongodb.port = 27017; // default: 27017
config.mongodb.username = 'bedrock'; // default: bedrock
config.mongodb.password = 'password'; // default: password

// alternatively, use `mongodb` URL format:
// bedrock.config.mongodb.url = 'mongodb://localhost:27017/mongodb-minimal';

// enable local collection if a local database is available
// config.mongodb.local.enable = true;
