/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* navigator */
'use strict';

export default {
  controller: Ctrl,
  templateUrl: 'angular-merchant/home-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;
  
  self.buy = async () => {
    const pr = new PaymentRequest([{
      supportedMethods: ['basic-card']
    }], {
      total: {
        label: 'Total',
        amount: {currency: 'USD', value: '1.00'}
      }
    });
    try {
      const response = await pr.show();
    } catch(e) {
      console.error(e);
    }
  };
  
  self.polyfillLoaded = false;

  // load polyfill
  (async () => {
    try {
      await polyfill.load();
      self.polyfillLoaded = true;
      console.log('polyfill loaded');
    } catch(e) {
      console.error(e);
    }
  })();


  self.loadPolyfill = () => {
    (async () => {
      try {
        await polyfill.load();
        console.log('polyfill loaded.');
      } catch(e) {
        console.error(e);
      }
    })();
  };

  self.test = () => {
    (async () => {
      console.log('calling test manager "test" function...');
      const result = await polyfill.testManager.test();
      console.log('result', result);
      console.log('done');
    })();
  };

  self.toggle = () => {
    (async() => {
      await polyfill.testManager.toggle();
    })();
  };
}
