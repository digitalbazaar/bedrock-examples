/*!
 * Example unskinned component.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'advanced-skinning/unskinned.html'
};

function Ctrl(brRegisterService) {
  const self = this;
  self.email = '';
  self.password = '';

  self.submit = function() {
    brRegisterService.register(self.email, self.password);
  };
}
