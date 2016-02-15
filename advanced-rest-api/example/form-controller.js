/*
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define(['lodash'], function(_) {

'use strict';

/* @ngInject */
function factory(brAlertService, $scope, $http) {
  var self = this;

  Promise.resolve($http.get('/people'))
    .then(function(response) {
      console.log('current people: ');
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

  self.addPerson = function(newPerson) {
    var person = null;
    try {
      person = JSON.parse(newPerson);
    } catch(e) {
      return alert(e);
    }
    Promise.resolve(
      $http({
        url: '/people',
        method: 'POST',
        data: person
      }))
      .then(function(response) {
        self.response = response;
        if(self.response.data.valid.valid) {
          var person = self.response.data.framed['@graph'][0];
          console.log('Created new person with name: ' + person.name);
        }
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      })
      .then(function() {
        $scope.$apply();
      });
  };

  self.setPerson = function(person) {
    self.person = JSON.stringify(person, null, 2);
  };

  self.peopleTemplates = {};
  self.peopleTemplates.a = {
    label: 'Alice',
    person: {
      '@context': {'@vocab': 'http://schema.org/'},
      '@type': 'Person',
      name: 'Alice'
    }
  };
  self.peopleTemplates.b = {
    label: 'Bob',
    person: {
      '@context': {
        'person_name': 'http://schema.org/name',
        'AutonomousBeing': 'http://schema.org/Person'
      },
      '@type': 'AutonomousBeing',
      'person_name': 'Bob'
    }
  };
  self.peopleTemplates.c = {
    label: 'Cathy Good Birthday',
    person: {
      '@context': 'http://schema.org/',
      '@type': 'Person',
      name: 'Cathy',
      birthDate: '2011-05-26T07:56:00.123Z'
    }
  };
  self.peopleTemplates.d = {
    label: 'David Bad Birthday',
    person: {
      '@context': 'http://schema.org/',
      '@type': 'Person',
      name: 'David',
      birthDate: Date()
    }
  };
}

return {FormController: factory};

});
