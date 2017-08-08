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
function Ctrl() {
  const self = this;

  // TODO: call window.addEventListener('message', ...) and await
  // incoming payment request

  // TODO: call postMessage to send 'ready' message
  console.log('load payment app');
}
