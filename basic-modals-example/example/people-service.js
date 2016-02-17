/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory() {
  var service = {};
  service.people = [];

  return service;
}

return {exPeopleService: factory};
});
