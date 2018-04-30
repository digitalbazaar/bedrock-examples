<template>
  <div>
    <div>
      <q-btn
        color="primary"
        icon="fa-warning"
        label="Notify"
        @click="notify"
        class="q-ma-md"/>
    </div>
    <div class="q-ma-md">
      Running Quasar v{{version}}
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'home',
  data() {
    return {
      version: this.$q.version
    };
  },
  methods: {
    notify() {
      this.$q.notify('Running on Quasar v' + this.$q.version);
    }
  }
};
</script>
<style>
</style>
