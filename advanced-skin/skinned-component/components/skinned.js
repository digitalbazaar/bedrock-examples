/*!
 * Example skinned component module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import SkinnedComponent from './skinned-component.js';

const module = angular.module('app.skinned', ['app.unskinned', 'bedrock.form']);

bedrock.setRootModule(module);

module.component('brSkinned', SkinnedComponent);

/* @ngInject */
module.config(function($routeProvider) {
  // override the route defined in the unskinned angular module `app.unskinned`
  // this replaces the component defined on that route with the skinned
  // component
  $routeProvider
  .when('/', {
    title: 'Example Home',
    template: '<br-skinned></br-skinned>'
  });
});
