/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import * as rpc from 'web-request-rpc';

export const polyfill = {};

polyfill.load = async () => {
  const url = 'https://bedrock.dev:18443/mediator';
  const appContext = new rpc.WebAppContext();
  const injector = await appContext.createWindow(url);
  polyfill.testManager = injector.define('testManager', {
    functions: ['test', 'toggle']
  });
};
