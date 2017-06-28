/*!
 * Example skinned component module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import SkinnedComponent from './skinned-component.js';
import PasswordConfirmationDiective from './password-confirmation-directive.js';

var module = angular.module('app.skinned', ['bedrock.form']);

bedrock.setRootModule(module);

module.component('brSkinned',SkinnedComponent);
module.directive('brPasswordConfirmation',PasswordConfirmationDiective);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    title: 'Example Home',
    template: '<br-skinned></br-skinned>'
  });
});
