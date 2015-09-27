/*!
 * Example unskinned controller.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(RegisterService) {
  var self = this;

  self.submit = function() {
    RegisterService.register(self.email, self.password);
  };
}

return {UnskinnedController: factory};

});
