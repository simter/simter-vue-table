<template>
<table :class="$_rootClass" :style="styles.root">
  <colgroup is="st-colgroup" :columns="columns"></colgroup>
  <thead v-if="!withoutThead" is="st-thead"
         :columns="columns"
         :classes="classes.thead"
         :styles="styles.thead"></thead>
  <tbody :class="classes.tbody" :style="styles.tbody">
    <template v-if="group" v-for="(rows, groupKey) in $_groupedRows">
      <!-- generate group row -->
      <tr :key="groupKey" :class="classes.groupRow || 'st-group-row'"
        :style="styles.groupRow">
        <td :class="classes.groupCell || 'st-group-cell'"
          :style="styles.groupCell"
          :colspan="$_columnsLeaf.length"
          >{{groupKey}}</td>
      </tr>
      <!-- generate group's data row -->
      <tr v-for="(row, rowIndex) in rows"
        :key="groupKey + (row[idProp] || rowIndex)"
        :class="classes.row || 'st-row'" :style="styles.row">
        <td v-for="(column, columnIndex) in $_columnsLeaf"
          :key="column.id"
          :class="classes.cell || 'st-cell'" :style="styles.cell">
          <component :is="$_getCellComponent(column)"
            :column-index="columnIndex" :column="column"
            :row-index="rowIndex" :row="row"
            @cell-change="reemitCellChangeEvent">
          </component>
        </td>
      </tr>
    </template>
    <template v-else>
      <!-- generate data row -->
      <tr v-for="(row, rowIndex) in rows" :key="row[idProp] || rowIndex"
          :class="classes.row || 'st-row'" :style="styles.row">
        <td v-for="(column, columnIndex) in $_columnsLeaf" :key="column.id"
            :class="classes.cell || 'st-cell'" :style="styles.cell">
          <component :is="$_getCellComponent(column)"
            :column-index="columnIndex" :column="column"
            :row-index="rowIndex" :row="row"
            @cell-change="reemitCellChangeEvent">
          </component>
        </td>
      </tr>
    </template>
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

/**
 * var rows = [{g: 'b', id: 22}, {g: 'a', id: 11}, {g: 'b', id: 21}, {id: 52}, {id: 50}]
 * groupBy(rows, 'g', ['c', 'd']) :
 * {
 *   b: [{g: 'b', id: 22}, {g: 'b', id: 21}],
 *   a: [{g: 'a', id: 11}],
 *   undefined: [{id: 52}, {id: 50}],
 *   c: [],
 *   d: []
 * }
 */
var groupByRows = function(rows, groupKey, defaultGroups) {
  const groupRows = rows.reduce(function(rv, row) {
    (rv[row[groupKey]] = rv[row[groupKey]] || []).push(row);
    return rv;
  }, {});

  if (defaultGroups)
    defaultGroups
      .filter(g => !(g in groupRows))
      .forEach(g => (groupRows[g] = []));
  return groupRows;
};

const component = {
  props: {
    idProp: { type: String, required: false, default: "id" },
    pickedProp: { type: String, required: false, default: "picked" },
    withoutThead: { type: Boolean, required: false, default: false },
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
    group: { type: [String, Object], required: false }
  },
  data() {
    return { defaultCellClass: "st-cell" };
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     * It gather all columns leaf to return.
     */
    $_columnsLeaf() {
      return flatten(this.columns);
    },
    /** Use user define class by `:class`, otherwise use default class. */
    $_rootClass() {
      return "class" in this.$vnode.data ? "" : "st-table";
    },
    /** Polishing the `group` config to a standard Object format */
    $_group() {
      return typeof this.group !== "object" ? { prop: this.group } : this.group;
    },
    /** Group the rows by the `group` prop config */
    $_groupedRows() {
      if (!this.$_group) return null;
      return groupByRows(this.rows, this.$_group.prop, this.$_group.names);
    },
    /** Collect all the selected row by the `pickedProp`'s boolean value */
    selection() {
      if (!this.rows) return [];
      else return this.rows.filter(r => r[this.pickedProp]);
    }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead,
    ...cells
  },
  methods: {
    $_getCellComponent(column) {
      if (!column.cell) {
        // global cell
        return (
          (typeof this.cell === "object" ? this.cell.component : this.cell) ||
          "st-cell-text"
        );
      } else {
        // column cell
        return (
          (typeof column.cell === "object"
            ? column.cell.component
            : column.cell) || "st-cell-text"
        );
      }
    },
    reemitCellChangeEvent($event) {
      // console.log("in table: newValue=%s, oldValue=%s", $event.newValue, $event.oldValue);

      // reemit cell-change event
      this.$emit("cell-change", $event);
    }
  },
  watch: {
    selection(newValue, oldValue){
      this.$emit("selection-change", newValue, oldValue);
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