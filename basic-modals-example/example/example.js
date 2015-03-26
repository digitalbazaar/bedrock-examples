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
    templateUrl: requirejs.toUrl('example/Modal.html')
  });
});

/* @ngInject */
module.controller('PersonController', function($scope) {
  $scope.person = {name:"Bedrock", traits:['versatile', 'fast']};
  //$scope.name = "Bedrock";
  //$scope.traits = ['versatile', 'fast'];
  console.log('controller created');

});

module.controller('TraitController', function($scope) {
  $scope.trait = 'test';
});

module.directive('personEditor', function(){
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'person-editor',
    controller: 'PersonController',
    controllerAs: 'model',
    link: function(scope, element, attrs, stackable) {
      scope.ok = function() {
        stackable.close(scope.person);
      };
    }
  };
});

module.directive('traitAdder', function(){
  return{
    restrict: 'E',
    require: '^stackable',
    templateUrl: 'trait-adder',
    controller: 'TraitController',
    controllerAs: 'model',
    link: function(scope, element, attrs, stackable) {
      scope.ok = function() {
        console.log(scope);
        /**if(scope.trait.length() > 1){
          stackable.close(scope.trait);
        }
        else{
          //add error - forgot how to do this bedrock way
        }*/
      };
    }
  };
});

return module.name;

});
