<template>
<table :class="rootClass" :style="styles.root">
  <colgroup is="st-colgroup" :columns="columns"></colgroup>
  <thead v-if="thead" is="st-thead"
         :columns="columns"
         :classes="classes.thead"
         :styles="styles.thead"></thead>
  <tbody :class="classes.tbody" :style="styles.tbody">
    <tr v-for="(row, rowIndex) in rows"
        :key="row.id || rowIndex"
        :class="classes.row"
        :style="styles.row">
      <component v-for="(column, columnIndex) in columnsLeaf"
        :is="(column.cell && column.cell.type) || defaultCellType"
        :key="column.id"
        :class="classes.cell || defaultCellClass"
        :style="styles.cell"
        :column-index="columnIndex"
        :column="column"
        :row-index="rowIndex"
        :row="row"
        @cell-change="reemitCellChangeEvent">
      </component>
    </tr>
  </tbody>
</table>
</template>

<script>
import colgroup from "simter-vue-colgroup";
import thead from "simter-vue-thead";

// inner cell components
import cellText from "./cell/text.vue";
import cellHtml from "./cell/html.vue";
import cellRowPicker from "./cell/row-picker.vue";
import cellTextEditor from "./cell/text-editor.vue";
import cellNumberEditor from "./cell/number-editor.vue";
const cells = {
  "st-cell-text": cellText,
  "st-cell-html": cellHtml,
  "st-cell-row-picker": cellRowPicker,
  "st-cell-text-editor": cellTextEditor,
  "st-cell-number-editor": cellNumberEditor
};

const component = {
  props: {
    thead: { type: Boolean, required: false, default: true },
    columns: { type: Array, required: true },
    rows: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    classes: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    styles: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    defaultCellType: { type: String, required: false, default: "st-cell-text" }
  },
  data() {
    return { defaultCellClass: "st-cell" };
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     * It gather all columns leaf to return.
     */
    columnsLeaf() {
      return flatten(this.columns);
    },
    /** Use user define class by `:class`, otherwise use default class. */
    rootClass() {
      return "class" in this.$vnode.data ? "" : "st-table";
    }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead,
    ...cells
  },
  methods: {
    reemitCellChangeEvent($event) {
      // console.log("in table: newValue=%s, oldValue=%s", $event.newValue, $event.oldValue);

      // reemit cell-change event
      this.$emit("cell-change", $event);
    }
  }
};

/**
 * Flatten all leaf object to simple object array.
 *
 * Example :
 * 1. [{id: 1}, {id: 2}]
 *    flatten to
 *    [{id: 1}, {id: 2}]
 * 2. [{id: 1}, {children: [{id: 2}, {id: 3}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}]
 * 3. [{id: 1}, {children: [{id: 2}, {children: [{id: 3}, {id: 4}]}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
 */
function flatten(columns) {
  return columns.reduce(
    (a, b) => a.concat(b.children ? flatten(b.children) : b),
    []
  );
}

export { flatten };
export default component;
</script>