/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

export async function activate() {
  console.log('payment handler activating!');
  const PaymentHandler = navigator.paymentPolyfill.PaymentHandler;
  const mediatorOrigin = 'https://payment.mediator.dev:12443';
  const self = new PaymentHandler(mediatorOrigin);

  self.addEventListener('paymentrequest', event => {
    // TODO: handle event
    console.log('got payment request event', event);

    event.respondWith(new Promise(async (resolve, reject) => {
      console.log('resolving event');
      resolve({
        // TODO: update once data sent to handler is cleaned up
        methodName: event.methodData[0].supportedMethods[0],
        details: {
          cardHolderName: 'Pat Smith',
          cardNumber: '1232343451234',
          expiryMonth: '12',
          expiryYear: '2020',
          cardSecurityCode: '123'
        }
      });
      // self.addEventListener('message', listener = function(e) {
      //   self.removeEventListener('message', listener);
      //   if(e.data.hasOwnProperty('name')) {
      //     reject(e.data);
      //   } else {
      //     resolve(e.data);
      //   }
      // });

      // try {
      //   const windowClient = await e.openWindow('/payment-app');
      //   windowClient.postMessage({...});
      // } catch(err) {
      //   reject(err);
      // }
    }));
    console.log('event.respondWith called');
  });

  self.addEventListener('paymentabort', event => {
    // TODO: handle event
    console.log('got payment abort event', event);
  });

  await self.connect();
  console.log('payment handler connected');
}
