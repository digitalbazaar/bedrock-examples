/*
 * Bedrock-based Website Example
 *
 * Copyright (c) 2014-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
require('bedrock-views');
require('bedrock-webpack');

// load skin config
require('./configs/skinned');

bedrock.start();
