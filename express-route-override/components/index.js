/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import TestRouteComponent from './test-route-component.js';

const module = angular.module('example.express-route-override', []);

bedrock.setRootModule(module);

module.component('brTestRoute',TestRouteComponent);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Test',
      template: '<br-test-route></br-test-route>'
    });
});
