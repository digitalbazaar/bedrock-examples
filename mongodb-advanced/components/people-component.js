/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'mongodb-advanced/people-component.html'
};

function Ctrl($scope, exPeopleService) {
  const self = this;
  self.showMyModal = false;

  exPeopleService.getPeople(people => {
    self.savedPeople = people;
    $scope.$apply('refreshData');
  });

  self.modalClosed = () => {
    exPeopleService.getPeople(people => {
      self.savedPeople = people;
      $scope.$apply('refreshData');
    });
  };

  self.deletePerson = name => {
    exPeopleService.removePerson(name, () => {
      exPeopleService.getPeople(people => {
        self.savedPeople = people;
        $scope.$apply('refreshData');
      });
    });
  };
}
