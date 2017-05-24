/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const config = require('bedrock').config;
const path = require('path');
require('bedrock-express');
require('bedrock-requirejs');
require('bedrock-views');

// root module path
const rootPath = path.join(__dirname, '..');

// angular-basic pseudo bower package
config.requirejs.bower.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'bower.json')
});

// custom main app loader
// config.views.system.paths.main =
//   path.join(rootPath, 'system/main.js');

config.paths.cache = path.join(__dirname, '..', '.cache');
