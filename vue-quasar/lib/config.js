/*
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const config = require('bedrock').config;
const path = require('path');

// add pseudo packages
const rootPath = path.join(__dirname, '..');
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});

config.paths.cache = path.resolve(path.join(__dirname, '.cache'));
