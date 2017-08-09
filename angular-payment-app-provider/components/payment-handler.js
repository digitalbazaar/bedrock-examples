/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

export async function activate() {
  const PaymentHandler = navigator.paymentPolyfill.PaymentHandler;
  const self = new PaymentHandler();

  self.addEventListener('paymentrequest', event => {
    // TODO: handle event
    console.log('got payment request event', event);

    // TODO: event.respondWith(...
    // TODO: client = event.openWindow('/payment-app')
    // TODO: client.addEventListener('message', ...)
    // TODO: client.postMessage(...)
  });

  self.addEventListener('paymentabort', event => {
    // TODO: handle event
    console.log('got payment abort event', event);
  });

  await self.connect();
}
