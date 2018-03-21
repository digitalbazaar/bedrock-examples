/*!
 * Copyright (c) 2016-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

/* @ngInject */
export default function factory($http) {
  const service = {};

  service.get = () => $http.get('/people').then(r => r.data);

  service.new = name => $http.post('/people/' + name).then(r => r.data);

  return service;
}
