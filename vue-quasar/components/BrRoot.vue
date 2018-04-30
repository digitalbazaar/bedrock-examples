<template>
  <q-layout>

    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat round dense
          @click="showLeft = !showLeft"
          icon="fa-bars"
        />
        <q-toolbar-title>
          Layout Header
          <span slot="subtitle">Optional subtitle</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer side="left" v-model="showLeft">
      <q-list no-border link inset-separator>
        <q-list-header>Essential Links</q-list-header>
        <q-item to="/docs">
          <q-item-side icon="fa-info" />
          <q-item-main label="Docs" sublabel="docs.foo.org" />
        </q-item>
        <q-item to="/forum">
          <q-item-side icon="fa-group" />
          <q-item-main label="Forum" sublabel="forum.foo.org" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-layout-footer>
    </q-layout-footer>

  </q-layout>
</template>
<script>
export default {
  name: 'BrRoot',
  data() {
    return {
      showLeft: false
    };
  }
};
</script>
<style>
</style>
