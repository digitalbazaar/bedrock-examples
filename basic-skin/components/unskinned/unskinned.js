/*!
 * Example unskinned component module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Matt Collier
 */
define(
  ['angular', './unskinned-controller'],
  function(angular, unskinnedController) {

'use strict';

var module = angular.module('app.unskinned', []);

module.controller(unskinnedController);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Example Home',
      templateUrl: requirejs.toUrl('example-unskinned/unskinned.html')
    });
});

return module.name;

});
