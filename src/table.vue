<template>
<table :class="['st-table', classes.table]" :style="styles.root">
  <colgroup is="st-colgroup" :columns="columns"></colgroup>
  <thead v-if="!withoutThead" is="st-thead"
         :columns="columns"
         :classes="classes.thead"
         :styles="styles.thead"></thead>
  <tbody :class="classes.tbody" :style="styles.tbody">
    <template v-if="group" v-for="groupRow in $_groupedRows">
      <!-- generate group row -->
      <tr :key="groupRow.rowIndex" :class="['st-group-row', classes.groupRow]"
        :style="styles.groupRow">
        <td :class="['st-group-cell', classes.groupCell]"
          :style="styles.groupCell"
          :colspan="$_columnsLeaf.length">
          <component :is="$_getCellComponent($_group)"
            :column-index="0" :column="{id: 'id', cell: $_group.cell}"
            :row-index="groupRow.rowIndex" :row="groupRow"
            @cell-change="reemitCellChangeEvent">
          </component>
        </td>
      </tr>
      <!-- generate group's data row -->
      <tr v-for="(row, rowIndex) in groupRow.rows"
        :key="groupRow.rowIndex + rowIndex + 1"
        :class="['st-row', classes.row]" :style="styles.row">
        <td v-for="(column, columnIndex) in $_columnsLeaf"
          :key="column.id"
          :class="['st-cell', classes.cell]" :style="styles.cell"
          @click.stop="$emit('cell-click', {rowIndex, row, columnIndex, column, row, column, target: $event.target})">
          <component :is="$_getCellComponent(column)"
            :column-index="columnIndex" :column="column"
            :row-index="groupRow.rowIndex + rowIndex + 1" :row="row"
            :group-row="groupRow"
            @cell-change="reemitCellChangeEvent">
          </component>
        </td>
      </tr>
    </template>
    <template v-if="!group">
      <!-- generate data row -->
      <tr v-for="(row, rowIndex) in rows" :key="row[idProp] || rowIndex"
          :class="['st-row', classes.row]" :style="styles.row">
        <td v-for="(column, columnIndex) in $_columnsLeaf" :key="column.id"
          :class="['st-cell', classes.cell]" :style="styles.cell"
          @click.stop="$emit('cell-click', {rowIndex, row, columnIndex, column, row, column, target: $event.target})">
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
import groupRows from "./utils/group";
import { deepAssign, merge } from "./utils/smart-assign";
import {
  classes as jquiClasses,
  cell as jquiCell
} from "./integration/jquery-ui";

// inner cell components
import cellText from "./cell/text.vue";
import cellHtml from "./cell/html.vue";
import cellRowPicker from "./cell/row-picker.vue";
import cellTextEditor from "./cell/text-editor.vue";
import cellNumberEditor from "./cell/number-editor.vue";

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
  computed: {
    /**
     * The result of function call flatten(this.columns).
     * It gather all columns leaf to return.
     */
    $_columnsLeaf() {
      return flatten(this.columns);
    },
    /** Polishing the `group` config to a standard Object format */
    $_group() {
      return typeof this.group === "string" ? { prop: this.group } : this.group;
    },
    /** Group the rows by the `group` prop config */
    $_groupedRows() {
      if (!this.$_group) return null;
      return groupRows(this.rows, this.$_group);
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

    "st-cell-text": cellText,
    "st-cell-html": cellHtml,
    "st-cell-row-picker": cellRowPicker,
    "st-cell-text-editor": cellTextEditor,
    "st-cell-number-editor": cellNumberEditor
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
    },
    deleteSelection() {
      this.selection.forEach(r =>
        this.$delete(this.rows, this.rows.indexOf(r))
      );
    }
  },
  watch: {
    selection(newValue, oldValue) {
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

const integration = {
  jqui: { classes: jquiClasses, cell: jquiCell }
};
export { flatten, integration };
export default component;
</script>