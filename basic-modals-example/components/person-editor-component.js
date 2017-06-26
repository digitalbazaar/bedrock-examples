/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'basic-modals-example/person-editor.html',
  require: '^stackable'
};

function Ctrl(brAlertService, exPeopleService) {
  var self = this;
//  self.showMyModal = false;
  self.showTraitModal = false;
  self.person = {name: '', traits: []};

  self.savePerson = function() {
    if(this.person.name.length > 1 && this.person.traits.length > 0) {
      exPeopleService.people.push(this.person);
      stackable.close(null, this.person);
    } else {
      brAlertService.add('error',
        'Please enter a valid name and at least one trait');
    }
  };
}
