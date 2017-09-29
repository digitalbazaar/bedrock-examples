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

const module = angular.module('app.unskinned', ['bedrock.form', 'ngMaterial']);

bedrock.setRootModule(module);

module.component('brUnskinned', UnskinnedComponent);
module.service('brRegisterService', RegisterService);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Example Home',
      template: '<br-unskinned></br-unskinned>'
    });
});
