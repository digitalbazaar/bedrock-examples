/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default function factory($timeout) {
  return {
    restrict: 'A',
    scope: {
      trigger: '@exFocus'
    },
    link: Link
  };

  function Link(scope, element) {
    scope.$watch('trigger', (value) => {
      if(value === 'true') {
        $timeout(() => {
          element[0].focus();
        });
      }
    });
  }
}
