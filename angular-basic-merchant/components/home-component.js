/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

export default {
  controller: Ctrl,
  templateUrl: 'angular-basic-merchant/home-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;
  const PaymentRequest = navigator.paymentPolyfill.PaymentRequest;

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
      console.log('response', response);
    } catch(e) {
      console.error(e);
    }
  };
}
