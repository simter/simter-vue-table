<template>
<label :class="['row-picker', classes.container]" :style="styles.container">
  <input v-if="showPicker && this.isGroupPicker" type="checkbox" v-model="picked_"
    :class="classes.picker" :style="styles.picker"
    @change.stop="pickedGroupEvent">
  <input v-if="showPicker && !this.isGroupPicker" type="checkbox" v-model="picked"
         :class="classes.picker" :style="styles.picker">
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
    return { picked_: false };
  },
  computed:{
    picked:{
      get() {
        if (this.isGroupPicker) {
          return this.picked_;
        } else if (this.id) {
          return this.row.value[this.id];
        } else {
          return this.picked_;
        }
      },
      set(value) {
        if (this.isGroupPicker) {
          this.picked_ = value;
        } else {
          if (this.id) {
            this.row.value[this.id] = value;
          } else {
            this.picked_ = value;
          }
          if (this.row.group) {
            // unpick group row's picker if it is picked
            let groupRowPicker = this.$parent.$refs.groupRowPicker
              .filter(t => t.row.rowIndex === this.row.group.rowIndex);
            if (!value) {
              groupRowPicker.forEach(t => t.picked && (t.picked = false));
            } else {
              // picked group if all children of the group are picked
              if (
                this.$parent.$refs.rowPicker
                  .filter(
                    t => t.row.group && t.row.group.rowIndex === this.row.group.rowIndex
                  )
                  .every(t => t.picked)
              ) groupRowPicker.forEach(t => !t.picked && (t.picked = true));
            }
          }
        }
        this.$emit("pick", {picked: value, row: this.row});
      }
    }
  },
  created(){
  },
  methods: {
    pickedGroupEvent() {
      // pick all the children row
      this.$parent.$refs.rowPicker
        .filter(t => t.row.group && t.row.group.rowIndex === this.row.rowIndex)
        .forEach(t => {
          if (t.picked !== this.picked_) t.picked = this.picked_;
        });
      this.$emit("pick", {picked: this.picked_, row: this.row});
    }
  }
};
</script>