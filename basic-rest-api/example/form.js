/*!
 * Example component module.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
define(['angular', 'underscore'], function(angular, _) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Form Example',
    templateUrl: requirejs.toUrl('example/form.html')
  });
});

/* @ngInject */
module.controller('HelloController', function($scope, $http, brAlertService) {
  var self = this;

  self.name = '';

  Promise.resolve($http.get('/people'))
    .then(function(response) {
      console.log('people: ');
      _.each(response.data, function(d) {
        console.log(d.name + ' ');
      });
      self.people = response.data;
    })
    .catch(function(err) {
      brAlertService.add('error', err);
    })
    .then(function() {
      $scope.$apply();
    });

  self.newPerson = function(newName) {
    Promise.resolve($http.post('/people/' + newName))
      .then(function(response) {
        console.log('Created new person with name: ' + newName);
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      })
      .then(function() {
        $scope.$apply();
      });
  };
});

return module.name;

});
