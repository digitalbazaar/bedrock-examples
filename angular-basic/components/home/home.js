/*
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './home-controller',
  './home-component'
], function(angular) {

'use strict';

var module = angular.module('angular-basic.home', []);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

});
