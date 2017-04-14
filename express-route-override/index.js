/*
 * Express route override example.
 *
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');

const brExpress = require('bedrock-express');
require('bedrock-server');
require('bedrock-views');

require('./config');

/* uncomment to override mock-default-service; this method must be
  used prior to requiring `mock-default-service` */
// bedrock.events.on('bedrock-express.configure.routes', (app) => {
//   app.get('/override', (req, res) => res.json({body: 'Override Method 1'}));
// });

require('./mock-default-service');

/* uncomment to override mock-default-service; this method can be used
  after `mock-default-service` */
// bedrock.events.on('bedrock-express.configure.router', (app) => {
//   const router = new brExpress.express.Router();
//   router.get('/', (req, res) => res.json({body: 'Override Method 2'}));
//   app.use('/override', router);
// });

bedrock.start();
