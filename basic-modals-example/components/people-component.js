/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'basic-modals-example/people.html'
};

function Ctrl(exPeopleService) {
  var self = this;
  self.showMyModal = false;
  self.people = exPeopleService.people;
}
