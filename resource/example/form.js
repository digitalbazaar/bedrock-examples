/*!
 * Example component module.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Omar Malik
 */
define(['angular', 'underscore'], function(angular, _) {

'use strict';

var module = angular.module('app.example', ['bedrock.alert', 'bedrock.resource']);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Resource Example',
    templateUrl: requirejs.toUrl('example/form.html')
  });
});

/* @ngInject */
module.service('peopleService', function factory(brRefreshService, brResourceService) {
  var service = {};
  service.collection = new brResourceService.Collection({
    url: '/people'
  });
  return service;
});

/* @ngInject */
module.controller('HelloController', function factory($scope, brRefreshService, brAlertService, peopleService) {
  var self = this;
  self.name = '';

  brRefreshService.register($scope, function(force) {
    var opts = {
      force: !!force,
    };
    peopleService.collection.getAll(opts)
      .then(function(resource) {
        console.log(resource);
        self.people = resource;
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      })
      .then(function() {
        $scope.$apply();
      });
  })();

  brRefreshService.refresh();

  self.newPerson = function(newName) {
    var params = {
      name: newName
    }
    peopleService.collection.add(params)
      .then(function(response) {
        console.log('Created a new person with the name: ', newName);
        brRefreshService.refresh();
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
