/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
require('bedrock-views');
require('bedrock-webpack');

// load config
require('./config');

bedrock.start();
