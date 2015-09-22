/*
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brAlertService, $scope, $http) {
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

  self.newPerson = function(newPerson) {
    var person = null;
    try {
      person = JSON.parse(newPerson);
    } catch(e) {
      return alert(e);
    }
    Promise.resolve(
      $http({
        url: '/people/' + person.label,
        method: 'POST',
        data: person.person
      }))
      .then(function(response) {
        self.response = response;
        console.log('Created new person with name: ' + person.label);
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      })
      .then(function() {
        $scope.$apply();
      });
  };

  self.setPerson = function(person) {
    self.person = JSON.stringify(person);
  };

  self.peopleTemplates = {};
  self.peopleTemplates.a = {
    label: 'Alice',
    person: {
      '@context': {'@vocab': 'http://schema.org/'},
      '@type': 'Person',
      name: 'Alice ' + Date.now()
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
      'person_name': 'Bob ' + Date.now()
    }
  };
  self.peopleTemplates.c = {
    label: 'Cathy Good Birthday',
    person: {
      '@context': 'http://schema.org/',
      '@type': 'Person',
      name: 'Cathy ' + Date.now(),
      birthDate: '2011-05-26T07:56:00.123Z'
    }
  };
  self.peopleTemplates.d = {
    label: 'David Bad Birthday',
    person: {
      '@context': 'http://schema.org/',
      '@type': 'Person',
      name: 'David ' + Date.now(),
      birthDate: Date()
    }
  };
}

return {formController: factory};

});
