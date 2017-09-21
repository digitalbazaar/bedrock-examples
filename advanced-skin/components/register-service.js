/*!
 * Example Register service.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
function factory() {
  const service = {};

  service.register = function(email, password) {
    alert('Thank you for registering!');
  };

  return service;
}

export default factory;
