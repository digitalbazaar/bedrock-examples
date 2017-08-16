/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const config = require('bedrock').config;
const path = require('path');
require('bedrock-server');

// server info
config.server.port = 12443;
config.server.httpPort = 12080;
config.server.domain = 'payment.mediator.dev';

// angular-credential-mediator-site pseudo package
const rootPath = path.join(__dirname, '..');
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});
