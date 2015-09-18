/*
 * Example configuration.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 */
// load bedrock modules
require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

var config = require('bedrock').config;
var path = require('path');

// location of configuration files
var _cfgdir = path.join(__dirname, '..');

// location of static resources
var _datadir = path.join(__dirname, '..');

// location of logs
var _logdir = path.join(_datadir, 'logs');

// core
config.core.workers = 1;
config.core.master.title = 'example1d';
config.core.worker.title = 'example1d-worker';
config.core.worker.restart = false;

// logging
config.loggers.logdir = _logdir;
config.loggers.app.filename = path.join(_logdir, 'example-app.log');
config.loggers.access.filename = path.join(_logdir, 'example-access.log');
config.loggers.error.filename = path.join(_logdir, 'example-error.log');
config.loggers.email.silent = false;

// server
config.server.port = 8002;
config.server.httpPort = 8001;
config.server.bindAddr = ['localhost'];
config.server.domain = 'localhost';
config.server.host = 'localhost:8002';
config.server.baseUri =
  'https://' + config.server.host + ':' + config.server.port + '/';
config.server.key = _cfgdir + '/pki/example.key';
config.server.cert = _cfgdir + '/pki/example.crt';

// session info
config.express.session.secret = 'NOT_A_SECRET_123456789';
config.express.session.key = 'example.sid';
config.express.session.prefix = 'example.';

// express static resource config
config.express.staticOptions = {
  maxAge: config.express.cache.maxAge
};

// branding
config.brand.name = 'example';

// 'minify' setting used in non-production mode
config.views.vars.minify = false;

config.views.vars.baseUri = config.server.baseUri;
config.views.vars.serviceHost = config.server.host;
config.views.vars.serviceDomain = config.server.domain;
config.views.vars.supportDomain = 'example.com';

// FIXME: add logo img
config.views.vars.style.brand.src = null;

config.views.vars.title = config.brand.name;
config.views.vars.siteTitle = config.brand.name;
config.views.vars.debug = false;
config.views.vars.productionMode = false;

// pseudo bower package
config.requirejs.bower.packages.push({
  path: path.join(__dirname, '..', 'components'),
  manifest: {
    name: 'example-unskinned',
    moduleType: 'amd',
    main: './main.js',
    dependencies: {
      angular: '~1.3.0'
    }
  }
});
