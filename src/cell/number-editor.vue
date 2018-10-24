<template>
<td :class="classes.root || ['number-editor', cfg.class]" :style="styles.root">
  <input type="number" :value="value" :class="classes.input" :style="styles.input"
    @keyup.enter="acceptChange(column.id, $event.target.value, value)"
    @keyup.esc="cancelChange"
    @blur="cancelChange">
</td>
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