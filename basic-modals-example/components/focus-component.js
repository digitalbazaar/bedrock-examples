/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  restrict: 'A',
  scope: {
    trigger: '@exFocus'
  }
};

function Ctrl() {
  var self = this;
  this.$watch('trigger', function(value) {
    if(value === 'true') {
      $timeout(function() {
        element[0].focus();
      });
    }
  });
}
