/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'mongodb-advanced/person-editor-component.html',
  require: {stackable: '^'}
};

function Ctrl(brAlertService, exPeopleService) {
  const self = this;
  self.showTraitModal = false;
  self.person = {name: '', traits: []};

  self.savePerson = () => {
    if(this.person.name.length > 1 && this.person.traits.length > 0) {
      exPeopleService.savePerson(self.person)
        .then(() => self.stackable.close(null, self.person))
        .catch(err => brAlertService.add('error', err));
    } else {
      brAlertService.add('error',
        'Please enter a valid name and at least one trait');
    }
  };
}
