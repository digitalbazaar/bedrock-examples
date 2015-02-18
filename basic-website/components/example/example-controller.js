/*!
 * Example controller.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope, config) {
  var self = this;
  var data = config.data;
  self.count = 0;
  console.log('ExampleController initialized...');

  self.inc = function() {
    self.count = self.count + 1;
    console.log('Count incremented to:', self.count);
  };
}

return {ExampleController: factory};

});
