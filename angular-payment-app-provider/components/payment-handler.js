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
      // resolve({
      //   // TODO: update once data sent to handler is cleaned up
      //   methodName: event.methodData[0].supportedMethods[0],
      //   details: {
      //     cardHolderName: 'Pat Smith',
      //     cardNumber: '1232343451234',
      //     expiryMonth: '12',
      //     expiryYear: '2020',
      //     cardSecurityCode: '123'
      //   }
      // });

      let windowClient;
      let listener;
      window.addEventListener('message', listener = function(e) {
        if(!(e.source === windowClient &&
          e.origin === window.location.origin)) {
          console.log('ignoring cross origin message');
          return;
        }

        if(e.data.type === 'request') {
          // send payment request
          console.log('sending payment request to frontend...');
          return windowClient.postMessage({
            topLevelOrigin: event.topLevelOrigin,
            methodData: event.methodData,
            total: event.total
          }, window.location.origin);
        }

        // assume payment handler response or error
        window.removeEventListener('message', listener);
        if(e.data.hasOwnProperty('name')) {
          // assume data is an error
          // TODO: clean this up
          reject(e.data);
        } else {
          resolve(e.data);
        }
      });

      try {
        console.log('opening app window...');
        windowClient = await event.openWindow('/payment-app');
        console.log('app window open, waiting to payment request to it...');
      } catch(err) {
        reject(err);
      }
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
