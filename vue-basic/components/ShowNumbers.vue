<template>
  <div>
    <h3>Numbers</h3>
    <div v-for="number in (sortDescending ? descending : ascending)">
      <div>{{number}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'show-numbers',
  props: {
    sortDescending: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      numbers: [1, 5, 99, 6, 75]
    };
  },
  computed: {
    descending() {
      return this.numbers.slice().sort();
    },
    ascending() {
      return this.numbers.slice().sort((a, b) => b - a);
    }
  }
};
</script>
<style>
</style>
