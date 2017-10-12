/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default function factory(brResourceService, brAlertService, brRefreshService) {
  const service = {};
  service.collection = new brResourceService.Collection({url: '/people'});

  service.savePerson = function(person) {
    console.log('saving person ' + JSON.stringify(person));
    service.collection.add(person)
      .then(function(response) {
        console.log('Created new person : ' + JSON.stringify(person));
        service.getPeople();
        brRefreshService.refresh();
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      });
  };

  service.getPeople = function() {
    console.log('get saved people');
    service.collection.getAll()
      .then(function(response) {
        service.savedPeople = response;
        console.log('Save people are:');
        console.log(JSON.stringify(response))
      })
      .catch(function(err) {
        brAlertService.add('error', err);
      })
      .then(function() {
        brRefreshService.refresh();
      });
  };

  service.savedPeople = service.getPeople();

  service.removePerson = function() {
    console.log('removeing a person');
  };

  return service;
}
