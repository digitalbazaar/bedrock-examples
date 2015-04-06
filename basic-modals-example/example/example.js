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

var module = angular.module('app.example', ['bedrock.alert']);



/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Example',
    templateUrl: requirejs.toUrl('example/example.html')
  });
});

/* @ngInject */
module.controller('PeopleController', function($scope) {
  $scope.people = [];
});


module.directive('personEditor', function(brAlertService) {
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'person-editor',
    link: function(scope, element, attrs, stackable) {
      scope.person = {name:"", traits:[]};
      scope.ok = function(person) {
        if(person.name.length > 1 && person.traits.length > 0) {
          scope.people.push(person);
          stackable.close(null, person);
        }
        else {
          brAlertService.add('error', 
            'Please enter a valid name and atleast one trait');
        }
      };
    }
  };
});

module.directive('traitAdder', function(brAlertService) {
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'trait-adder',
    link: function(scope, element, attrs, stackable) {
      scope.trait = '';
      scope.ok = function(trait) {
        if(trait.length > 1) {
          scope.person.traits.push(trait);
          stackable.close(null, trait);
        }
        else {
          brAlertService.add('error', 'Please enter a valid trait');
        }
      };
    }
  };
});

return module.name;

});
