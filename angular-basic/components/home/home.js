/*
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './home-controller',
  './home-directive'
], function(angular, homeController, homeDirective) {

'use strict';

var module = angular.module('angular-basic.home', []);

module.controller(homeController);
module.directive(homeDirective);

return module.name;

});
