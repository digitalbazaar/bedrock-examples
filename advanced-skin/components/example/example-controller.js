
/*!
 * Example controller.
 *
 * Copyright (c) 2014-2015 Digital Bazaar, Inc. All rights reserved.
 *
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope) {
  var self = this;

  self.submit = function() {
    alert('Thank you for submitting the form!');
  };
}

return {ExampleController: factory};

});
