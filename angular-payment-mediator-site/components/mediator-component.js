/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import * as polyfill from 'payment-mediator-polyfill';

// TODO: import from angular-web-request?
//import {PermissionDialogComponent} from 'angular-web-request';

export default {
  controller: Ctrl,
  templateUrl: 'angular-payment-mediator-site/mediator-component.html'
};

/* @ngInject */
function Ctrl($location) {
  const self = this;

  let relyingOrigin;
  if(window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length > 0) {
    relyingOrigin = window.location.ancestorOrigins[0];
  } else {
    const query = $location.search();
    relyingOrigin = query.origin;
  }

  (async () => {
    try {
      await polyfill.load({
        relyingOrigin: relyingOrigin,
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
