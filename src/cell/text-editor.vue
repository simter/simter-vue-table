<template>
<input type="text" :value="text"
  :class="['text-editor', classes.text]"
  :style="styles.text"
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
    return { text: null };
  },
  created() {
    // init the text value
    this.text = this.value;
  },
  methods: {
    cancelChange($event) {
      $event.target.value = this.value;
    }
  }
};
</script>