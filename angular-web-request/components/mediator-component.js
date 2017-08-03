/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {WebRequestMediator} from 'web-request-mediator';

export default {
  controller: Ctrl,
  templateUrl: 'angular-web-request/mediator-component.html'
};

class TestManager {
  constructor(wrm) {
    this.mediator = wrm;
  }

  async test() {
    return 'test function called';
  }

  async toggle() {
    const self = this;
    await self.mediator.show();
    console.log('hiding in 2 seconds...');
    setTimeout(() => {
      console.log('hiding.');
      self.mediator.hide();
    }, 2000);
  }
}

// HACK: fixes babel compiler bug that makes `TestManager` undefined
// below in `Ctrl`
const _ugly = new TestManager();

/* @ngInject */
function Ctrl() {
  const self = this;

  (async () => {
    const origin = 'https://bedrock.dev:18443';
    const wrm = new WebRequestMediator(origin);

    // define custom server API
    wrm.server.define('testManager', new TestManager(wrm));

    // connect to relying origin
    const injector = await wrm.connect();

    // TODO: define custom client API
    // injector.define();
  })();
}
