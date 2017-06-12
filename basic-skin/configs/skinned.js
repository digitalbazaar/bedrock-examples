/*
 * Skinned configuration.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

// build off of unskinned config
require('./unskinned');

// angular template overrides
var overrides = config.views.vars.angular.templates.overrides;
overrides['basic-skin/unskinned.html'] = 'basic-skin/skinned.html';
