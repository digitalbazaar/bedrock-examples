/*!
 * Example Unskinned controller.
 *
 * Copyright (c) 2015 Digital Bazaar, Inc. All rights reserved.
 */
 export default {
    controller: Ctrl,
    templateUrl: 'basic-skin/unskinned-component.html'
 };

function Ctrl() {
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
};
