/*!
 * Copyright (c) 2014-2016 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Omar Malik
 */
define([
  'angular',
  './people-controller',
  './people-service'
], function(angular, peopleController, peopleService) {

'use strict';

var module =
  angular.module('app.example', ['bedrock.alert', 'bedrock.resource']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Resource Example',
    templateUrl: requirejs.toUrl('angular-resource/form.html')
  });
});

module.controller(peopleController);
module.service(peopleService);

return module.name;
});
