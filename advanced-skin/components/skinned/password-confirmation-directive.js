/*!
 * Password confirmation directive.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function factory() {
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

return {passwordConfirmation: factory};

});
