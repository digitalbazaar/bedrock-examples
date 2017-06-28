/*!
 * Example unskinned component module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import UnskinnedComponent from './unskinned-component.js';
import RegisterService from './register-service.js';

var module = angular.module('app.unskinned', ['bedrock.form']);

bedrock.setRootModule(module);

module.component('brUnskinned',UnskinnedComponent);
module.service('brRegisterService',RegisterService);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
   .when('/', {
     title: 'Example Home',
     template: '<br-unskinned></br-unskinned>'
   });
});
