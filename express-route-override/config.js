/*
 * Express Route Override configuration.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;
const path = require('path');

// cache
config.paths.cache = path.resolve(path.join(__dirname, '.cache'));

// server
config.server.port = 8002;
config.server.httpPort = 8001;
config.server.domain = 'localhost';

// branding
config.brand.name = 'Express Route Override Example';

config.views.vars.baseUri = config.server.baseUri;
config.views.vars.serviceHost = config.server.host;
config.views.vars.serviceDomain = config.server.domain;
config.views.vars.supportDomain = 'example.com';
config.views.vars.title = config.brand.name;
config.views.vars.siteTitle = config.brand.name;

// pseudo bower package for example
const rootPath = path.resolve(path.join(__dirname));
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});

config.views.system.importAllIgnore.push('bootstrap');
