/*!
 * Example controller.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope, config) {
  var self = this;
  var data = config.data;
  self.one = 1;
  self.two = 2;
  self.three = 3;
  self.four = 4;
}

return {ExampleController: factory};

});
