/*!
 * Example component module.
 *
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
define([
  'angular',
  './people-controller',
  './people-service'
], function(angular, peopleController, peopleService) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Form Example',
    templateUrl: requirejs.toUrl('basic-rest-api/form.html')
  });
});

module.controller(peopleController);
module.service(peopleService);

return module.name;
});
