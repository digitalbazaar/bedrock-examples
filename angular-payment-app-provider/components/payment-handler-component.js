/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global navigator */
'use strict';

import {activate} from './payment-handler';

export default {
  controller: Ctrl,
  template: '<div></div>'
};

let handlerActivated = false;

/* @ngInject */
function Ctrl() {
  const self = this;

  console.log('loaded payment handler component');

  if(!handlerActivated) {
    console.log('activating handler');
    activate();
    handlerActivated = true;
  }
}
