/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(exPeopleService) {
  var self = this;
  self.people = exPeopleService.people;
}

return {exPeopleController: factory};
});
