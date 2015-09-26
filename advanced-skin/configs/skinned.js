/*
 * Skinned configuration.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// build off of unskinned config
require('./unskinned');

// pseudo bower package
config.requirejs.bower.packages.push({
  path: path.join(__dirname, '..', 'components', 'skinned'),
  manifest: {
    name: 'example-skinned',
    moduleType: 'amd',
    main: './skinned.js',
    dependencies: {
      angular: '~1.3.0',
      'example-unskinned': '0.0.1'
    }
  }
});

// angular template overrides
var overrides = config.views.vars.angular.templates.overrides;
overrides['example-unskinned/unskinned.html'] = 'example-skinned/skinned.html';
