/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
import * as brVue from 'bedrock-vue';
import * as brVuetify from 'bedrock-vue-vuetify';
import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

// install all plugins
Vue.use(brVue);
Vue.use(brVuetify);
// Vue.use(brHeader);
// Vue.use(brFooter);

brVue.setRootVue(() => {
  const Test = {
    name: 'test',
    template: `<div><p>Test page</p>
    <v-alert type="success" :value="true">
      This is a success alert.
    </v-alert>

    <v-alert type="info" :value="true">
      This is a info alert.
    </v-alert>

    <v-alert type="warning" :value="true">
      This is a warning alert.
    </v-alert>
    </div>`
  };

  const router = new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', component: Test}
    ]
  });

  Vue.component('br-header', {template: '<div>test</div>'});

  return new Vue({
    template: '<app/>',
    components: {App},
    router
  });
});
