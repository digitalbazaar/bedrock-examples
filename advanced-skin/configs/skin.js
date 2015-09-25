/*
 * skin configuration.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// pseudo bower package
config.requirejs.bower.packages.push({
  path: path.join(__dirname, '..', 'skin'),
  manifest: {
    name: 'example-skinned',
    moduleType: 'amd',
    main: './main.js',
    dependencies: {
      angular: '~1.3.0',
      'example-unskinned': '0.0.1'
    }
  }
});

// angular template overrides
config.views.vars.angular.templates.overrides[
  'example-unskinned/example/example.html'] =
    'example-skinned/example/example.html';
