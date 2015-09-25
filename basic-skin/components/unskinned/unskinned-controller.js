/*!
 * Example Unskinned controller.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory() {
  var self = this;
  self.one = 1;
  self.two = 2;
  self.three = 3;
  self.four = 4;
}

return {UnskinnedController: factory};

});
