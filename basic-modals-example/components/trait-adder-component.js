/*!
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  bindings: {
    thePerson: '=brPerson'
  },
  require: {stackable: '^'},
  templateUrl: 'basic-modals-example/trait-adder.html'
};

function Ctrl(brAlertService) {
  var self = this;
  self.trait = '';

  self.addTrait = function() {
    if(self.trait.length > 1) {
      self.thePerson.traits.push(self.trait);
      self.stackable.close(null, this.person);
    } else {
      brAlertService.add('error', 'Please enter a valid trait');
    }
  };
}
