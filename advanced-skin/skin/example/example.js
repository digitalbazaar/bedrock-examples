/*!
 * Example component module.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([
  'angular',
  './skin-controller',
  './passphrase-confirmation-directive'
], function(
  angular,
  skinController,
  passphraseConfirmation
) {

'use strict';

var module = angular.module('app.skin-example', []);

module.controller(skinController);
module.directive(passphraseConfirmation);

return module.name;

});
