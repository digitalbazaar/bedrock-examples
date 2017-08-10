/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* navigator */
'use strict';

export default {
  controller: Ctrl,
  templateUrl: 'angular-payment-app-provider/payment-app-component.html'
};

/* @ngInject */
function Ctrl($scope) {
  const self = this;

  window.addEventListener('message', event => {
    console.log('frontend got payment request info', event.data);
    self.paymentRequest = event.data;
    $scope.$apply();
  });

  self.pay = () => {
    window.parent.postMessage({
      // TODO: update once data sent to handler is cleaned up
      methodName: self.paymentRequest.methodData[0].supportedMethods[0],
      details: {
        cardHolderName: 'Pat Smith',
        cardNumber: '1232343451234',
        expiryMonth: '12',
        expiryYear: '2020',
        cardSecurityCode: '123'
      }
    }, window.location.origin);
  };

  (async () => {
    // request payment request
    window.parent.postMessage({type: 'request'}, window.location.origin);

    console.log('loaded payment app UI');
  })();
}
