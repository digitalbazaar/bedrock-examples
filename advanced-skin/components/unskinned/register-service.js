/*!
 * Example Register service.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory() {
  var service = {};

  service.register = function(email, password) {
    alert('Thank you for registering!');
  };

  return service;
}

return {RegisterService: factory};

});
