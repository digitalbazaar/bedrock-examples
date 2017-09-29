/*!
 * Advanced skinned component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'advanced-skinning-skinned/skinned-component.html'
};

function Ctrl(brRegisterService) {
  const self = this;

  self.submit = function() {
    if(confirm('Are you sure you want to register?')) {
      brRegisterService.register(self.email, self.password);
    }
  };
}
