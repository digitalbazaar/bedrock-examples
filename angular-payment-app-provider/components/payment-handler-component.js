/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

export default {
  controller: Ctrl,
  template: '<div></div>'
};

let handler;

/* @ngInject */
function Ctrl() {
  const self = this;

  if(!handler) {
    activate();
  }
}

async function activate() {
  const PaymentHandler = navigator.paymentPolyfill.PaymentHandler;
  handler = new PaymentHandler();

  handler.addEventListener('paymentrequest', event => {
    // TODO: handle event
    console.log('got payment request event', event);

    // TODO: client = openWindow('/payment-app')
    // TODO: client.addEventListener('message', ...)
    // TODO: client.postMessage(...)
  });

  handler.addEventListener('paymentabort', event => {
    // TODO: handle event
    console.log('got payment abort event', event);
  });

  await handler.connect();
}
