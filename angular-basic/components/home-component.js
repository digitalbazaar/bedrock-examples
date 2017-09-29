/*!
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'angular-basic/home-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;
  self.display = {
    page1: true,
    page2: false
  };

  self.showPage = function(page) {
    _display(page);
  };

  function _display(showProperty) {
    for(const propertyName in self.display) {
      self.display[propertyName] = false;
    }
    self.display[showProperty] = true;
  }
}
