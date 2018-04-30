/*
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
require('bedrock-views');
require('bedrock-webpack');

// load config
require('./config');

bedrock.start();
