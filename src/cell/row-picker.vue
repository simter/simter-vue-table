<template>
<label :class="['row-picker', classes.container]" :style="styles.container">
  <input v-if="showPicker" type="checkbox" v-model="picked" 
    :class="classes.picker" :style="styles.picker"
    @change.stop="pickedEvent">
  <span v-if="showNumber" :class="classes.number" :style="styles.number"
    >{{(row.group ? row.group.index + 1 + '-' : '') + (row.index + 1)}}</span>
</label>
</template>

<script>
// Row picker for row selection

import cellBase from "./base";

export default {
  extends: cellBase,
  props: {
    isGroupPicker: { type: Boolean, required: false, default: false },
    showNumber: { type: Boolean, required: false, default: true },
    showPicker: { type: Boolean, required: false, default: true }
  },
  data() {
    return { picked: false };
  },
  created() {
    // init the picked value
    if (this.id) this.picked = this.row.value[this.id];
  },
  methods: {
    pickedEvent() {
      if (this.isGroupPicker) {
        // pick all the children row
        this.$parent.$refs.rowPicker
          .filter(
            t => t.row.group && t.row.group.rowIndex === this.row.rowIndex
          )
          .forEach(t => {
            if (t.picked !== this.picked) t.picked = this.picked;
          });
      } else if (this.row.group) {
        // unpick group row's picker if it is picked
        let groupRowPicker = this.$parent.$refs.groupRowPicker
          .filter(t => t.row.rowIndex === this.row.group.rowIndex);
        if (!this.picked) {
          groupRowPicker.forEach(t => t.picked && (t.picked = false));
        } else {
          // picked group if all children of the group are picked
          if (
            this.$parent.$refs.rowPicker
              .filter(
                t => t.row.group && t.row.group.rowIndex === this.row.group.rowIndex
              )
              .every(t => t.picked)
          ) groupRowPicker.forEach(t => t.picked = true);
        }
      }

      // emit pick event
      this.$emit("pick", { picked: this.picked, row: this.row });
    }
  }
};
</script>