/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
import * as brVue from 'bedrock-vue';
import BrRoot from './BrRoot.vue';
import Home from './Home.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

// install all plugins
Vue.use(brVue);

// replace default `br-root` with a custom one
Vue.component('br-root', BrRoot);

brVue.setRootVue(() => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', component: Home, meta: {title: 'Vue Quasar Home'}}
    ]
  });

  const BrApp = Vue.component('br-app');
  return new BrApp({
    router
  });
});
