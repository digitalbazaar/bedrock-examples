/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

var config = require('bedrock').config;
var path = require('path');

// angular-basic pseudo bower package
var rootPath = path.join(__dirname, '..');
config.requirejs.bower.packages.push({
  path: rootPath,
  manifest: path.join(rootPath, 'bower.json')
});
