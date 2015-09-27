/*!
 * Example controller.
 *
 * Copyright (c) 2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Manu Sporny
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(config) {
  this.name = config.data.siteTitle;
  this.bedrock = 'Bedrock';
  console.log('ExampleController initialized...');
}

return {ExampleController: factory};

});
