/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {polyfill} from './test-polyfill';

export default {
  controller: Ctrl,
  templateUrl: 'angular-web-request/service-provider-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;

  self.loadPolyfill = () => {
    (async () => {
      try {
        await polyfill.load();
        console.log('calling test manager "test" function...');
        const result = await polyfill.testManager.test();
        console.log('result', result);
        await polyfill.testManager.toggle();
        console.log('done');
      } catch(e) {
        console.error(e);
      }
    })();
  };
}
