/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(
  $scope, brAlertService, brRefreshService, brResourceService,
  exPeopleService) {
  var self = this;

  self.name = '';

  brRefreshService.register($scope, function(force) {
    var opts = {
      force: !!force,
    };
    exPeopleService.collection.getAll(opts)
      .then(function(resource) {
        console.log('People:', JSON.stringify(resource, null, 2));
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
    if(newName.length === 0) {
      brAlertService.add('error', 'Name must not be blank.');
      return;
    }
    var params = {
      name: newName
    };
    exPeopleService.collection.add(params)
      .then(function(response) {
        console.log('Created new person with name: ' + newName);
        brRefreshService.refresh();
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
