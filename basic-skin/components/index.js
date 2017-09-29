/*!
 * Example unskinned component module.
 *
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Matt Collier
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import UnskinnedComponent from './unskinned-component.js';

const module = angular.module('app.unskinned', []);

bedrock.setRootModule(module);

module.component('brUnskinned', UnskinnedComponent);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Example Home',
      template: '<br-unskinned></br-unskinned>'
    });
});
