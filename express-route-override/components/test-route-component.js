/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'express-route-override/test-route-component.html'
};

/* @ngInject */
function Ctrl($http) {
  var self = this;
  self.data = null;

  self.onClick = function() {
    $http.get('/override', {
      headers: {
        'accept': 'application/json'
      }
    }).then(function(response) {
      self.data = response.data.body;
    }).catch(function(err) {
      console.error(err);
      self.data = JSON.stringify(err);
    });
  };
}
