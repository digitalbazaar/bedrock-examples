/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import * as polyfill from 'payment-handler-polyfill';
import HomeComponent from './home-component';

'use strict';

const module = angular.module('angular-basic-merchant', []);
module.component('bmHome', HomeComponent);

bedrock.setRootModule(module);

const loadPolyfillPromise = polyfill.loadOnce();

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Basic Merchant Example',
      template: '<bm-home></bm-home>',
      resolve: {
        polyfill($q) {
          return $q.resolve(loadPolyfillPromise);
        }
      }
    });
});
