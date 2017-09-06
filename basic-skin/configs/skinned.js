/*
 * Skinned configuration.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;

// build off of unskinned config
require('./unskinned');

// angular template overrides
const overrides = config.views.vars.angular.templates.overrides;
overrides['basic-skin/unskinned-component.html'] =
  'basic-skin/skinned-component.html';
