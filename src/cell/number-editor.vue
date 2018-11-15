<template>
<input type="number" :value="num"
  :class="['number-editor', classes.number]"
  :style="styles.number"
  @keyup.enter="acceptChange(mutate, $event.target.value, value, $event.target)"
  @keyup.esc="cancelChange"
  @blur="cancelChange">
</template>

<script>
// Text editor

import cellBase from "./base";
export default {
  extends: cellBase,
  data() {
    return { num: null };
  },
  created() {
    // init the text value
    this.num = this.value;
  },
  methods: {
    cancelChange($event) {
      $event.target.value = this.value;
    }
  }
};
</script>