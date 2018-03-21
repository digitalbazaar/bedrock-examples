/*!
 * Example component module.
 *
 * Copyright (c) 2014-2018 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
'use strict';

import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import PeopleComponent from './people-component.js';
import PeopleService from './people-service.js';

const module = angular.module('app.example', [
  'bedrock.alert', 'bedrock.form', 'ngMaterial'
]);

bedrock.setRootModule(module);

module.component('exPeople', PeopleComponent);
module.service('exPeopleService', PeopleService);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider.when('/', {
    title: 'People Form Example',
    template: '<ex-people></ex-people>'
  });
});
