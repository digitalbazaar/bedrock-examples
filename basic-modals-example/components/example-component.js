/*!
 * Example component module.
 *
 * Copyright (c) 2014-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import PeopleComponent from './people-component.js';
import PersonEditorComponent from './person-editor-component.js';
import TraitAdderComponent from './trait-adder-component.js';
// import FocusComponent from './focus-component.js';
import PeopleService from './people-service.js';

var module = angular.module('app.basic.modals.example', ['bedrock.modal']);

bedrock.setRootModule(module);

module.component('brPeople',PeopleComponent);
module.component('brPersonEditor',PersonEditorComponent);
module.component('brTraitAdder',TraitAdderComponent);
// module.component('exFocusService',FocusComponent);
module.service('exPeopleService',PeopleService);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider.when('/', {
    title: 'Basic-modals Example',
    template: '<br-people></br-people>'
  });
});
