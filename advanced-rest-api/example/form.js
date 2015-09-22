/*!
 * Example component module.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([
  'angular',
  'underscore',
  './form-controller'
], function(angular, _, formController) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Form Example',
    templateUrl: requirejs.toUrl('example/form.html')
  });
});

module.controller(formController);

return module.name;

});
