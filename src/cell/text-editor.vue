<template>
<input type="text" :value="value"
  :class="['text-editor', classes.input]"
  :style="styles.input"
  @keyup.enter="acceptChange(column.id, $event.target.value, value)"
  @keyup.esc="cancelChange"
  @blur="cancelChange">
</template>

<script>
// Text editor

import cellBase from "./base";
export default {
  extends: cellBase,
  methods: {
    cancelChange($event) {
      $event.target.value = this.value;
    }
  }
};
</script>