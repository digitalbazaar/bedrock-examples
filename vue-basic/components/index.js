/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
import * as brVue from 'bedrock-vue';
import Home from './Home.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

// install all plugins
Vue.use(brVue);

brVue.setRootVue(() => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', component: Home, meta: {title: 'Vue Basic Home'}}
    ]
  });

  const BrApp = Vue.component('br-app');
  return new BrApp({
    router
  });
});
