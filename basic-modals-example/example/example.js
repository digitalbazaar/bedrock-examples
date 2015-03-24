/*!
 * Example component module.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
define([
  'angular'
], function(
  angular
) {

'use strict';

var module = angular.module('app.example', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Example',
    templateUrl: requirejs.toUrl('example/foo.html')
  });
  $routeProvider.when('/foo', {
    title: 'Example',
    templateUrl: requirejs.toUrl('example/foo.html')
  });
});

return module.name;

});
