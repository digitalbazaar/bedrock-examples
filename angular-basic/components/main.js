/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './home-component',
  './show-numbers-component'
], function(angular) {

'use strict';

var module = angular.module('angular-basic', []);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Angular Basic Home',
      template: '<ex-home></ex-home>'
    });
});

});
