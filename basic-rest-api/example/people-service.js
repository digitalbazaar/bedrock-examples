/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($http) {
  var service = {};

  service.get = function() {
    return Promise.resolve($http.get('/people'));
  };

  service.new = function(name) {
    return Promise.resolve($http.post('/people/' + name));
  };

  return service;
}

return {exPeopleService: factory};
});
