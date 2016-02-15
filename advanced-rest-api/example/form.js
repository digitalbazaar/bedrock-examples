/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([
  'angular',
  './form-controller'
], function(angular, formController) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Advanced REST API',
    templateUrl: requirejs.toUrl('bedrock-advanced-rest-api/form.html')
  });
});

module.controller(formController);

return module.name;

});
