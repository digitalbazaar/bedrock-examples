/*!
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './home/home'
], function(angular) {

'use strict';

var module = angular.module('angular-basic', []);

/* @ngInject */
module.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      title: 'Angular Basic Home',
      templateUrl: requirejs.toUrl('angular-basic/home/home.html')
    });
});

return module.name;

});
