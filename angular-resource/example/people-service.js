/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brResourceService) {
  var service = {};

  service.collection = new brResourceService.Collection({url: '/people'});

  return service;
}

return {exPeopleService: factory};
});
