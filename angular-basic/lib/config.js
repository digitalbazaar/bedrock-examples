/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
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

// systemJS
config.express.static.push({
  route: '/systemjs',
  path: path.join(rootPath, 'node_modules/systemjs/dist')
});

// systemJS babel plugin
config.express.static.push({
  route: 'systemjs/plugin-babel',
  path: path.join(rootPath, 'node_modules/systemjs-plugin-babel')
});

// systemJS main
config.express.static.push({
  route: '/systemjs/main.js',
  path: path.join(rootPath, 'systemjs/main.js'),
  file: true
});

config.views.paths.push(path.join(rootPath, 'views'));
