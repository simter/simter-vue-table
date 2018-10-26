export default {
  props: {
    // column
    columnIndex: { type: Number, required: true },
    column: { type: Object, required: true },

    // row
    rowIndex: { type: Number, required: true },
    row: { type: Object, required: true }
  },
  computed: {
    // cell config by column
    cfg() {
      return this.column.cell || {};
    },
    // cell backend value
    value() {
      return this.row[this.column.id];
    },
    // cell frontend content, text or html
    content() {
      return this.cfg.render
        // render(value, row)
        // can get more component instance data from `this`
        ? this.cfg.render.call(this, this.value, this.row)
        // origin value
        : this.value;
    },
    // zero base RC string, such as '[1, 3]'
    rc() {
      return `[${this.rowIndex}, ${this.columnIndex}]`;
    },
    // control each descendant dom element class
    classes() {
      return this.cfg.classes || {};
    },
    // control each descendant dom element style
    styles() {
      return this.cfg.styles || {};
    }
  },
  methods: {
    /** Accept the cell value change and emit cell-change event */
    acceptChange(prop, newValue, oldValue, target) {
      if (newValue != oldValue) {
        // console.log("acceptChange %s: newValue=%s, oldValue=%s", this.rc, newValue, oldValue);

        // update the row data
        this.$set(this.row, prop, newValue);

        // emit cell change event
        const data = {
          newValue, oldValue,
          columnIndex: this.columnIndex,
          column: this.column,
          rowIndex: this.rowIndex,
          row: this.row
        }
        if (target) data.target = target
        this.$emit("cell-change", data);
      }
    }
  }
}