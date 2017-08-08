/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {polyfill} from './payment-mediator-polyfill';

// TODO: import from angular-web-request?
import {PermissionDialogComponent} from 'angular-web-request';

// TODO: copied from web request example below

import {WebRequestMediator} from 'web-request-mediator';

export default {
  controller: Ctrl,
  templateUrl: 'angular-payment-mediator-site/mediator-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;

  (async () => {
    try {
      async await polyfill.load({
        requestPermission(permissionDesc) {
          // TODO:
        },
        showRequest(requestState) {
          // TODO: return PaymentResponse data
        }
      });
      console.log('payment mediator polyfill loaded');
    } catch(e) {
      console.error('payment mediator polyfill failed to load');
      console.error(e);
    }
  })();
}
