/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'mongodb-advanced/people-component.html'
};

function Ctrl(exPeopleService) {
  const self = this;
  self.showMyModal = false;
  self.savedPeople = exPeopleService.savedPeople;
}
