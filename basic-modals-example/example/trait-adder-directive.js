/*!
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(brAlertService) {
  return {
    restrict: 'E',
    require: '^stackable',
    scope: {
      person: '=exPerson'
    },
    templateUrl: requirejs.toUrl('basic-modals/trait-adder.html'),
    link: Link
  };

  function Link(scope, element, attrs, stackable) {
    var model = scope.model = {};
    model.person = scope.person;
    model.trait = '';
    model.ok = function(trait) {
      if(trait.length > 1) {
        model.person.traits.push(trait);
        stackable.close(null, trait);
      } else {
        brAlertService.add('error', 'Please enter a valid trait');
      }
    };
  }
}

return {exTraitAdder: factory};
});
