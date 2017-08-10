/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

import * as polyfill from 'payment-mediator-polyfill';
import {utils} from 'web-request-rpc';

// TODO: import from angular-web-request or something else?
//import {PermissionDialogComponent} from 'angular-web-request';

export default {
  controller: Ctrl,
  templateUrl: 'angular-payment-mediator-site/mediator-component.html'
};

/* @ngInject */
function Ctrl($location, $scope) {
  const self = this;

  if(window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length > 0) {
    self.relyingOrigin = window.location.ancestorOrigins[0];
  } else {
    const query = $location.search();
    self.relyingOrigin = query.origin;
  }

  self.accept = async () => {
    self.permissionRequest('granted');
    self.display = null;
    await navigator.paymentMediator.hide();
  };

  self.deny = async () => {
    self.permissionRequest('denied');
    self.display = null;
    await navigator.paymentMediator.hide();
  };

  self.selectPaymentInstrument = async (selection) => {
    self.display = null;
    let response;
    try {
      response = await navigator.paymentMediator.ui.selectPaymentInstrument(
        selection);
      console.log('response', response);
    } catch(e) {
      console.error(e);
      self.requestPaymentPromise.reject(e);
    }
    if(response) {
      self.requestPaymentPromise.resolve(response);
    }
    await navigator.paymentMediator.hide();
  };

  self.abortPayment = async () => {
    self.requestPaymentPromise.reject(new Error('Payment aborted.'));
    self.display = null;
    await navigator.paymentMediator.hide();
  };

  (async () => {
    try {
      await polyfill.load({
        relyingOrigin: self.relyingOrigin,
        requestPermission,
        showRequest
      });
      console.log('payment mediator site loaded polyfill');
    } catch(e) {
      console.error('payment mediator site failed to load polyfill');
      console.error(e);
    }
  })();

  async function requestPermission(permissionDesc) {
    // prep display
    self.display = 'permissionRequest';
    const promise = new Promise(resolve => {
      self.permissionRequest = state => resolve({state: state});
    });
    $scope.$apply();

    // show display and return promise
    await navigator.paymentMediator.show();
    return promise;
  }

  async function showRequest(requestState) {
    // prep display
    self.display = 'paymentRequest';
    self.merchantOrigin = requestState.topLevelOrigin;
    self.paymentRequest = requestState.paymentRequest;
    self.loading = true;
    const promise = new Promise((resolve, reject) => {
      self.requestPaymentPromise = {resolve, reject};
    });
    $scope.$apply();

    // show display
    await navigator.paymentMediator.show();

    // get matching instruments
    const instrumentOptions = await navigator.paymentMediator.ui
      .matchPaymentInstruments(requestState.paymentRequest);
    self.paymentInstrumentOptions = instrumentOptions.map(
      option => Object.assign({
        hostname: utils.parseUrl(option.paymentHandler).hostname
      }, option));
    self.loading = false;
    $scope.$apply();

    console.log('instruments', self.paymentInstrumentOptions);

    return promise;
  }
}
