/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;

// custom atabase configuration
config.mongodb.name = 'mongodb_advanced'; // default: bedrock_dev
config.mongodb.host = 'localhost'; // default: localhost
config.mongodb.port = 27017; // default: 27017
config.mongodb.username = 'bedrock'; // default: bedrock
config.mongodb.password = 'password'; // default: password
