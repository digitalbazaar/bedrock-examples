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

var module = angular.module('app.example', ['bedrock.alert']).directive('alert-directive', showAlert);

/* @ngInject */
function showAlert(brAlertService){
  return {
    restrict: 'E',
    scope: {},
    link: function(scope, element) {
      brAlertService.add('info', 'my-directive loaded.');
      scope.errorOccurred = function(err) {
        // add a feedback error; if the scope is destroyed, remove the error
        brAlertService.add('error', err, {scope: scope});
      };
    }
  };
}

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Example',
    templateUrl: requirejs.toUrl('example/Modal.html')
  });
});

/* @ngInject */
module.controller('PeopleController', function($scope) {
  $scope.people = [];
});


module.directive('personEditor', function(){
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'person-editor',
    link: function(scope, element, attrs, stackable) {
      scope.person = {name:"", traits:[]};
      scope.ok = function(person) {
        console.log(person);
        scope.people.push(person);
        stackable.close(null, person);
      };
    }
  };
});

module.directive('traitAdder', function(){
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'trait-adder',
    link: function(scope, element, attrs, stackable) {
      scope.trait = '';
      scope.ok = function(trait) {
        scope.person.traits.push(trait);
        stackable.close(null, trait);
      };
    }
  };
});

return module.name;

});
