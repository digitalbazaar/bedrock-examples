/*!
 * Advanced skinned controller.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(RegisterService) {
  var self = this;

  self.submit = function() {
    if(confirm('Are you sure you want to register?')) {
      RegisterService.register(self.email, self.password);
    }
  };
}

return {SkinnedController: factory};

});
