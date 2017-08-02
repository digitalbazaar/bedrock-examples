/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import * as rpc from 'web-request-rpc';

export const polyfill = {};

polyfill.load = async () => {
  const url = 'https://bedrock.dev:18443/mediator';
  const serverContext = new rpc.ServerContext();
  const injector = await serverContext.createWindow(url);
  polyfill.testManager = injector.define('testManager', {
    functions: ['test', 'toggle']
  });
};
