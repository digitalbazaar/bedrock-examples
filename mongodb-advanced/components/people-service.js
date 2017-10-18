/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default function factory($http) {
  const service = {};

  service.savePerson = (person) => $http.post('/people/', person)
    .then(response => response.data);

  service.getPeople = () => $http.get('/people')
    .then(response => response.data);

  service.removePerson = (name) => $http.delete('/people/' + name)
    .then(response => response.data);

  return service;
}
