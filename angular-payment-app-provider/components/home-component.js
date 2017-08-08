/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* navigator */
'use strict';

export default {
  controller: Ctrl,
  templateUrl: 'angular-payment-app-provider/home-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;

  self.install = () => {
    // TODO:
    console.log('install');
  };

  self.uninstall = () => {
    // TODO:
    console.log('uninstall');
  };
}
