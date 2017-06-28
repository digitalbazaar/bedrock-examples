/*
 * Skinned configuration.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;

// build off of unskinned config
require('./unskinned');

// angular template overrides
var overrides = config.views.vars.angular.templates.overrides;
overrides['advanced-skinning/unskinned/unskinned.html'] = 'advanced-skinning/skinned/skinned.html';
