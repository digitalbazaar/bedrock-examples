/*!
 * Password confirmation directive.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default function factory($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      var me = attrs.ngModel;
      var matchTo = attrs.passwordConfirmation;
      scope.$watchGroup([me, matchTo], function(value) {
        ctrl.$setValidity('inputMatch', value[0] === value[1]);
      });
    }
  };
}
