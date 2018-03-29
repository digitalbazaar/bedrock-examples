<template>
  <div>
    <button @click="showPage('page1')">Show Page 1</button>
    <button @click="showPage('page2')">Show Page 2</button>
    <div v-if="display.page1">
      <h1>Page 1</h1>
      <show-numbers :sort-descending="false"></show-numbers>
    </div>
    <div v-if="display.page2">
      <h1>Page 2</h1>
      <show-numbers :sort-descending="true"></show-numbers>
    </div>
  </div>
</template>
<script>
import ShowNumbers from './ShowNumbers.vue';

export default {
  name: 'home',
  components: {ShowNumbers},
  data() {
    return {
      display: {
        page1: true,
        page2: false
      }
    };
  },
  methods: {
    showPage(page) {
      for(const pageName in this.display) {
        this.display[pageName] = false;
      }
      this.display[page] = true;
    }
  }
};
</script>
<style>
</style>
