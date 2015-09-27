/*!
 * Example skinned component module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define(
  ['angular', './skinned-controller', './password-confirmation-directive'],
  function(angular, skinnedController, passwordConfirmationDirective) {

'use strict';

var module = angular.module('app.skinned', []);

module.controller(skinnedController);
module.directive(passwordConfirmationDirective);

return module.name;

});
