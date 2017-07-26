/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import MediatorComponent from './mediator-component';
import RelyingPartyComponent from './relying-party-component';
import ServiceProviderComponent from './service-provider-component';

'use strict';

const module = angular.module('angular-web-request', []);
module.component('wrMediator', MediatorComponent);
module.component('wrRelyingParty', RelyingPartyComponent);
module.component('wrServiceProvider', ServiceProviderComponent);

bedrock.setRootModule(module);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Web Request Test',
      template: `
        <div>
          <h3>Web Request Test</h3>
          <ol>
            <li><a href="/service-provider">Service Provider</a></li>
            <li><a href="/relying-party">Relying Party</a></li>
          </ol>
        </div>
      `
    })
    .when('/service-provider', {
      title: 'Web Request Test',
      template: '<wr-service-provider></wr-service-provider>'
    })
    .when('/relying-party', {
      title: 'Web Request Relying Party',
      template: '<wr-relying-party></wr-relying-party>'
    })
    .when('/mediator', {
      title: 'Web Request Mediator',
      template: '<wr-mediator></wr-mediator>'
    });
});
