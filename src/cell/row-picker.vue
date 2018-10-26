<template>
<label :class="['row-picker', classes.label]" :style="styles.label">
  <input type="checkbox" v-model="picked" :class="classes.input" :style="styles.input">
  <span v-if="cfg.showRowNumber" :class="classes.span" :style="styles.span"
    >{{rowIndex + 1}}</span>
  <span v-if="cfg.showContent" :class="classes.span" :style="styles.span"
    >{{content}}</span>
</label>
</template>

<script>
// Row picker for row selection

import cellBase from "./base";
export default {
  extends: cellBase,
  computed: {
    // the prop name that holds the picker status value
    pickedProp() {
      return this.cfg.pickedProp || this.column.id;
    },
    // the picker status
    picked: {
      get() {
        return this.row[this.pickedProp];
      },
      set(value) {
        this.acceptChange(this.pickedProp, value, !value, this.$el.firstElementChild);
      }
    }
  }
};
</script>