/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import * as polyfill from 'payment-handler-polyfill';
import HomeComponent from './home-component';
import PaymentAppComponent from './payment-app-component';
import PaymentHandlerComponent from './payment-handler-component';

'use strict';

const module = angular.module('angular-payment-app-provider', []);
module.component('paHome', HomeComponent);
module.component('paPaymentApp', PaymentAppComponent);
module.component('paPaymentHandler', PaymentHandlerComponent);

bedrock.setRootModule(module);

const loadPolyfillPromise = polyfill.loadOnce();

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Payment App Provider Example',
      template: '<pa-home></pa-home>',
      resolve: {
        polyfill($q) {
          return $q.resolve(loadPolyfillPromise);
        }
      }
    })
    // TODO: Would be nice to separate out the payment handler from the
    // rest of the application as a single static page in the future because
    // it would be a better (and more efficient) example; for now it is here
    // out of convenience/speed of implementation.
    .when('/payment-handler', {
      title: 'Payment Handler',
      template: '<pa-payment-handler></pa-payment-handler>',
      resolve: {
        polyfill($q) {
          return $q.resolve(loadPolyfillPromise);
        }
      }
    })
    .when('/payment-app', {
      title: 'Payment App',
      template: '<pa-payment-app></pa-payment-app>',
      resolve: {
        polyfill($q) {
          return $q.resolve(loadPolyfillPromise);
        }
      }
    });
});
