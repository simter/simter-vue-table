<template>
<label :class="['row-picker', classes.container]" :style="styles.container">
  <input v-if="showPicker && this.isGroupPicker" type="checkbox" v-model="picked"
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
    return { picked: false };
  },
  created(){
    if (this.isGroupPicker && this.id) {
      this.$watch("picked", value => {
        this.row.value[this.id] = value;
        this.$emit("pick", {picked: value, row: this.row});
      });
      this.$watch(`row.value.${this.id}`, value => {
        this.row.children && this.row.children.length === 0 && this.picked !== value && (this.picked = value);
      });
      this.row.children && this.row.children.length === 0 && (this.picked = this.row.value[this.id]);
    } else if (this.isGroupPicker && !this.id) {
      this.$watch("picked", value => {
        this.$emit("pick", {picked: value, row: this.row});
      });
    } else if (this.id) {
      this.$watch("picked", value => {
        this.row.value[this.id] = value;
        this.changeChildPicked(value);
        this.$emit("pick", {picked: value, row: this.row});
      });
      this.$watch(`row.value.${this.id}`, value => {
        this.picked !== value && (this.picked = value);
      });
      this.picked = this.row.value[this.id];
    } else {
      this.$watch("picked", value => {
        this.changeChildPicked(value);
        this.$emit("pick", {picked: value, row: this.row});
      });
    }
  },
  methods: {
    changeChildPicked(value){
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
    },
    pickedGroupEvent() {
      // pick all the children row
      this.$parent.$refs.rowPicker
        .filter(t => t.row.group && t.row.group.rowIndex === this.row.rowIndex)
        .forEach(t => {
          if (t.picked !== this.picked) t.picked = this.picked;
        });
    }
  }
};
</script>