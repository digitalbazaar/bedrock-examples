/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brAlertService, exPeopleService) {
  return {
    restrict: 'E',
    require: '^stackable',
    scope: {},
    templateUrl: requirejs.toUrl('basic-modals/person-editor.html'),
    link: Link
  };

  function Link(scope, element, attrs, stackable) {
    var model = scope.model = {};
    model.person = {name: '', traits: []};
    model.ok = function(person) {
      if(person.name.length > 1 && person.traits.length > 0) {
        exPeopleService.people.push(person);
        stackable.close(null, person);
      } else {
        brAlertService.add('error',
          'Please enter a valid name and at least one trait');
      }
    };
  }
}

return {exPersonEditor: factory};
});
