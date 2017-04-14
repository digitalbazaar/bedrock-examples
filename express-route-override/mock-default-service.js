/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
require('bedrock-express');

bedrock.events.on('bedrock-express.configure.routes', (app) => {
  app.get('/override', (req, res) => res.json({body: 'Not overridden'}));
});
