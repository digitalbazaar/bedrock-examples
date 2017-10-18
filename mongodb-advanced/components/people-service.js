/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default function factory($http, brResourceService, brAlertService) {
  const service = {};
  service.collection = new brResourceService.Collection({url: '/people'});

  service.savePerson = function(person, callback) {
    Promise.resolve($http.post('/people/', person))
      .then((response) => {
        callback();
      })
      .catch((err) => {
        brAlertService.add('error', err);
      });
  };

  service.getPeople = function(callback) {
    Promise.resolve($http.get('/people'))
      .then((result) => {
        callback(result.data);
      })
      .catch((err) => {
        brAlertService.add('error', err);
      });
  };

  service.removePerson = function(name, callback) {
    Promise.resolve($http.delete('/people/' + name))
      .then((response) => {
        callback();
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      });
  };

  return service;
}
