/*
 * Copyright (c) 2015-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const config = require('bedrock').config;
const path = require('path');

// MongoDB Configuration
config.mongodb.name = 'bedrock_basic_rest_dev'; // default: bedrock_dev

// add pseudo packages
const rootPath = path.join(__dirname);
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});
