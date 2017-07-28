/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

//import {WebRequestMediatorClient} from 'web-request-mediator-client';
import * as rpc from 'web-request-rpc';

export const polyfill = {};

let injector;

const testManagerDefinition = {
  functions: ['test', 'toggle']
};

polyfill.load = async () => {
  //const url = '/mediator';

  const url = 'https://bedrock.dev:18443/mediator';
  console.log('server context', rpc);
  const serverContext = new rpc.ServerContext();
  const injector = await serverContext.createWindow(url);
  polyfill.testManager = injector.define('testManager', testManagerDefinition);

  // const client = new WebRequestMediatorClient();
  // injector = await client.load(url);
  // injector.define('testManager', testManagerDefinition);
  // api.testManager = await injector.get('paymentManager');
};
