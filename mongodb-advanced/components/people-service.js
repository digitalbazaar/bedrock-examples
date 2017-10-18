/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default function factory($http, brAlertService) {
  const service = {};

  service.savePerson = (person, callback) => {
    Promise.resolve($http.post('/people/', person))
      .then(response => {
        callback();
      })
      .catch(err => {
        brAlertService.add('error', err);
      });
  };

  service.getPeople = callback => {
    Promise.resolve($http.get('/people'))
      .then(result => {
        callback(result.data);
      })
      .catch(err => {
        brAlertService.add('error', err);
      });
  };

  service.removePerson = (name, callback) => {
    Promise.resolve($http.delete('/people/' + name))
      .then(response => {
        callback();
      })
      .catch(err => {
        brAlertService.add('error', err);
      });
  };

  return service;
}
