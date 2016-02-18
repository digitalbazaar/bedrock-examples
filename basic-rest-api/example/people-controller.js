/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope, brAlertService, exPeopleService) {
  var self = this;

  self.name = '';

  exPeopleService.get()
    .then(function(response) {
      console.log('people: ');
      angular.forEach(response.data, function(d) {
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
    if(newName.length === 0) {
      brAlertService.add('error', 'Name must not be blank.');
      return;
    }
    exPeopleService.new(newName)
      .then(function(response) {
        console.log('Created new person with name: ' + newName);
        return exPeopleService.get();
      })
      .then(function(response) {
        self.people = response.data;
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      })
      .then(function() {
        $scope.$apply();
      });
  };
}

return {exPeopleController: factory};
});
