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
  './person-editor-directive',
  './trait-adder-directive',
  './people-service',
  './focus-directive'
], function(
  angular, peopleController, personEditorDirective, traitAdderDirective,
  peopleService, focusDirective) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Basic-modals Example',
    templateUrl: requirejs.toUrl('basic-modals/example.html')
  });
});

module.controller(peopleController);
module.directive(personEditorDirective);
module.directive(traitAdderDirective);
module.directive(focusDirective);
module.service(peopleService);

return module.name;

});
