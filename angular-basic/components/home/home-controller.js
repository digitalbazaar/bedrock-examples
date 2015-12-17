/*!
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope) {
  var self = this;
  self.display = {
    page1: true,
    page2: false
  };

  self.showPage = function(page) {
    _display(page);
  };

  function _display(showProperty) {
    for(var propertyName in self.display) {
      self.display[propertyName] = false;
    }
    self.display[showProperty] = true;
  }
}

return {homeController: factory};

});
