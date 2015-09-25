define(['angular', './example/example'], function(angular) {

'use strict';

var module = angular.module('app.main', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Example Home',
      templateUrl: requirejs.toUrl('example-unskinned/example/example.html')
    });
});

return module.name;
});
