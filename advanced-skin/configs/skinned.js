/*
 * Skinned configuration.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;
const path = require('path');

// build off of unskinned config
require('./unskinned');

var rootPath = path.join(__dirname, '..');
config.views.system.packages.push({
  path: path.join(rootPath, '/skinned-component/components'),
  manifest: path.join(rootPath, '/skinned-component/package.json')
});
