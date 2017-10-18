/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'mongodb-advanced/people-component.html'
};

function Ctrl(exPeopleService, brAlertService) {
  const self = this;
  self.showMyModal = false;

  self.getPeople = () => exPeopleService.getPeople().then(people =>
    self.savedPeople = people)
    .catch(err => brAlertService.add('error', err));

  self.$onInit = self.getPeople;

  self.deletePerson = name => exPeopleService.removePerson(name)
    .catch(err => brAlertService.add('error', err))
    .then(() => self.getPeople());
}
