/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brAlertService, exPeopleService, $timeout) {
  return {
    restrict: 'A',
    scope: {
      trigger: '@exFocus'
    },
    link: Link
  };

  function Link(scope, element) {
    scope.$watch('trigger', function(value) {
      if(value === 'true') {
        $timeout(function() {
          element[0].focus();
        });
      }
    });
  }
}

return {exFocus: factory};
});
