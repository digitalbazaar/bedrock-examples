/*
 * Bedrock-based Website Example
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');

// bedrock modules to load
// require('bedrock-express');
//require('bedrock-requirejs');
// require('bedrock-server');
// require('bedrock-views');

// load example config
require('./configs/example');

bedrock.start();
