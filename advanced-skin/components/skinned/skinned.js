/*!
 * Example skinned component module.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define(
  ['angular', './skinned-controller', './passphrase-confirmation-directive'],
  function(angular, skinnedController, passphraseConfirmation) {

'use strict';

var module = angular.module('app.skinned', []);

module.controller(skinnedController);
module.directive(passphraseConfirmation);

return module.name;

});
