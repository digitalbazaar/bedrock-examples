/*!
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import HomeComponent from './home-component.js';
import ShowNumbersComponent from './show-numbers-component.js';

var module = angular.module('angular-basic', []);

bedrock.setRootModule(module);

module.component('exHome', HomeComponent);
module.component('exShowNumbers', ShowNumbersComponent);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Angular Basic Home',
      template: '<ex-home></ex-home>'
    });
});
