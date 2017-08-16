/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

export default {
  controller: Ctrl,
  templateUrl: 'angular-basic-verifier/home-component.html'
};

/* @ngInject */
function Ctrl($scope) {
  const self = this;
  const credentials = navigator.credentialsPolyfill.credentials;

  self.request = async () => {
    try {
      const credential = await credentials.get({
        web: {
          verifiableProfile: {
            fooAttribute: true
          }
        }
      });
      console.log('credential received by verifier', credential);
      $scope.$apply();
    } catch(e) {
      console.error(e);
    }
  };
}
