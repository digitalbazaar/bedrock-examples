/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('exShowNumbers', {
    bindings: {
      sortDescending: '<'
    },
    controller: Ctrl,
    templateUrl: requirejs.toUrl('angular-basic/show-numbers-component.html')
  });
}

/* @ngInject */
function Ctrl() {
  var self = this;
  self.numbers = [1, 5, 99, 6, 75];
}

return register;

});
