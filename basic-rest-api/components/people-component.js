/*!
 * Copyright (c) 2016-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import angular from 'angular';

export default {
  controller: Ctrl,
  templateUrl: 'bedrock-rest-api/people-component.html'
};

/* @ngInject */
function Ctrl(brAlertService, exPeopleService) {
  const self = this;

  self.name = '';

  exPeopleService.get()
    .then(response => {
      console.log('people: ');
      angular.forEach(response, d => {
        console.log(d.name + ' ');
      });
      self.people = response;
    })
    .catch(err => {
      brAlertService.add('error', err);
    });

  self.newPerson = newName => {
    if(newName.length === 0) {
      brAlertService.add('error', 'Name must not be blank.');
      return;
    }
    exPeopleService.new(newName)
      .then(() => {
        console.log('Created new person with name: ' + newName);
        return exPeopleService.get();
      })
      .then(response => {
        self.people = response;
      })
      .catch(err => {
        brAlertService.add('error', err);
      });
  };
}
