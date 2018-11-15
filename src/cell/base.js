export default {
  props: {
    /**
     * The cell's id. 
     * Mostly use to record column.id for write back new value to origin row's data.
     */
    id: { type: [Number, String], required: false },
    /** The cell's index */
    cellIndex: { type: Number, required: true },
    /** cell backend value */
    value: { required: true },
    /** 
     * The belong row of this cell.
     * row: {value, rowIndex, index, group}
     * 1. row.group - {value, rowIndex, index}, the upper
     * 2. row.value - the origin row data
     * 3. row.rowIndex - the rowIndex in the table
     * 4. row.index - the array index in the origin rows or row.children
     * 
     * If the row has no upper belong group-row, there will be no group property.
     */
    row: { type: Object, required: true },

    // control each descendant dom element class
    classes: { type: Object, required: false, default() { return {} } },

    // control each descendant dom element style
    styles: { type: Object, required: false, default() { return {} } },

    // a render function to convert cell's value to a visable label
    render: { type: Function, required: false },

    // wherther to mutate the origin row's value if this is a editable cell
    mutate: { type: Boolean, required: false, default: false }
  },
  computed: {
    /** cell frontend content, text or html */
    label() {
      return this.render
        // render(value, row)
        // can get more component instance data from `this`
        ? this.render.call(this, this.value, this.row.value)
        // origin value
        : this.value;
    },
    /** 
     * zero base global RC string, such as '[1, 3]'.
     * Not include picker column.
     */
    rc() {
      return `[${this.row.rowIndex}, ${this.cellIndex}]`;
    }
  },
  methods: {
    /** Accept the cell value change and emit change event */
    acceptChange(mutate, newValue, oldValue, target) {
      if (newValue == oldValue) return;
      // console.log("acceptChange %s: id=%s, mutate=%s, newValu=%s, oldValue=%s", this.rc, this.id, mutate, newValue, oldValue);

      // update the origin row data
      if (mutate && this.id) {
        //console.log("mutate the origin row data for '%s'", this.id)
        this.$set(this.row.value, this.id, newValue);
      }

      // emit change event
      const data = {
        newValue, oldValue,
        cellIndex: this.cellIndex,
        row: this.row
      }
      if (this.id) data.id = this.id
      if (mutate) data.mutate = mutate
      this.$emit("change", data);
    }
  }
}