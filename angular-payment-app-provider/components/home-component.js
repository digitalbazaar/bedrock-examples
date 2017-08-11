/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

export default {
  controller: Ctrl,
  templateUrl: 'angular-payment-app-provider/home-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;

  const PaymentHandlers = navigator.paymentPolyfill.PaymentHandlers;

  self.install = async () => {
    console.log('installing...');
    try {
      await install();
      console.log('installation complete.');
    } catch(e) {
      console.error('installation failed,', e);
    }
  };

  self.uninstall = async () => {
    console.log('uninstalling...');
    try {
      await uninstall();
      console.log('uninstallation complete.');
    } catch(e) {
      console.error('uninstallation failed,', e);
    }
  };
}

async function install() {
  const PaymentHandlers = navigator.paymentPolyfill.PaymentHandlers;
  const PaymentManager = navigator.paymentPolyfill.PaymentManager;

  // ensure permission has been granted to add a payment instrument
  const result = await PaymentManager.requestPermission();
  if(result !== 'granted') {
    throw new Error('Permission denied.');
    return;
  }

  // get payment handler registration
  const registration = await PaymentHandlers.register('/payment-handler');

  console.log('adding instruments');
  await addInstruments(registration);
  console.log('payment instruments added');
}

async function uninstall() {
  const PaymentHandlers = navigator.paymentPolyfill.PaymentHandlers;
  const PaymentManager = navigator.paymentPolyfill.PaymentManager;

  // ensure permission has been granted to add a payment instrument
  const result = await PaymentManager.requestPermission();
  if(result !== 'granted') {
    throw new Error('Permission denied.');
  }

  // get payment handler registration
  const registration = await PaymentHandlers.register('/payment-handler');

  await registration.paymentManager.instruments.clear();
  console.log('payment instruments cleared');
}

async function addInstruments(registration) {
  return Promise.all([
    registration.paymentManager.instruments.set(
      'default',
      {
        name: 'Default',
        enabledMethods: ['basic-card'],
        capabilities: {
          supportedNetworks: ['visa', 'mastercard', 'amex', 'discover'],
          supportedTypes: ['credit', 'debit', 'prepaid']
        }
      })
    ]);
}
