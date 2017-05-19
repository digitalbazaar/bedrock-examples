/*!
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  bindings: {
    sortDescending: '<'
  },
  controller: Ctrl,
  templateUrl: 'angular-basic/show-numbers-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;
  self.numbers = [1, 5, 99, 6, 75];
}
