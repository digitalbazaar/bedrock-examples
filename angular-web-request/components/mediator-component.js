/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

//import * as wrMediator from 'web-request-mediator';
import * as rpc from 'web-request-rpc';

export default {
  controller: Ctrl,
  templateUrl: 'angular-web-request/mediator-component.html'
};

let _control;

class TestManager {
  async test() {
    return 'test function called';
  }

  async toggle() {
    await _control.show();
    console.log('hiding in 2 seconds...');
    setTimeout(() => {
      console.log('hiding.');
      _control.hide();
    }, 2000);
  }
}

/* @ngInject */
function Ctrl() {
  const self = this;

  (async () => {
    const origin = 'https://bedrock.dev:18443';
    const client = new rpc.Client();
    const injector = await client.connect(origin);
    const control = injector.define('core.control', {
      functions: ['ready', 'show', 'hide']
    });
    _control = control;

    const server = new rpc.Server();
    server.define('testManager', new TestManager());
    server.listen(origin);

    control.ready();

    // wrMediator.server.define('testManager', new TestManager());

    // const origin = 'https://bedrock.dev:18443';
    // wrMediator.listen({
    //   origin: origin
    // });

    // wrMediator
  })();
}
