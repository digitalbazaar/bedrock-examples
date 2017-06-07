/*!
 * Copyright (c) 2015-2016 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  bindings: {
    sortDescending: '<'
  },
  controller: Ctrl,
  templateUrl: 'angular-basic/show-numbers-component.html'
};

/* @ngInject */
function Ctrl() {
  var self = this;
  self.numbers = [1, 5, 99, 6, 75];
};
