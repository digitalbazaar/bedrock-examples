/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './test-route-component'
], function(angular) {

'use strict';

var module = angular.module('example.express-route-override', []);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Test',
      template: '<ex-test-route></ex-test-route>'
    });
});

});
