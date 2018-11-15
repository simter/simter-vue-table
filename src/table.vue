<template>
<table :class="['st-table', classes.table]" :style="styles.table">
  <colgroup is="st-colgroup" :columns="$_headerColumns"></colgroup>
  <thead v-if="!withoutThead" is="st-thead"
    :columns="$_headerColumns"
    :classes="{thead: classes.thead, row: classes.headerRow, cell: classes.headerCell}"
    :styles="{thead: styles.thead, row: styles.headerRow, cell: styles.headerCell}"></thead>
  <tbody :class="classes.tbody" :style="styles.tbody">
    <template v-for="row in rowsExt">
      <template v-if="row.isGroupRow">
        <!-- generate group row -->
        <tr :key="id ? row.value[id] : row.rowIndex" :class="['st-group-row', classes.groupRow]" :style="styles.groupRow">
          <!-- generate group row picker -->
          <td v-if="$_picker" :class="['st-group-cell st-row-picker', classes.groupCell]" :style="styles.groupCell">
            <component ref="groupRowPicker" :is="$_picker.component"
              v-bind="Object.assign({
                cellIndex: 0, 
                value: $_picker.id ? row.value[$_picker.id] : null,
                row: row,
                isGroupPicker: true
              }, $_picker)"
              v-on="$_rowEventListeners"
              v-on:pick="$_rowPickEvent">
            </component>
          </td>
          <!-- generate group row cell -->
          <td :class="['st-group-cell', classes.groupCell]" :style="styles.groupCell"
            :colspan="$_group.colspan || $_flattenColumns.length">
            <component :is="$_getCellComponent($_group)"
              v-bind="Object.assign({
                id: $_group.id,
                cellIndex: 0, 
                value: row.value[$_group.id],
                row: row
              }, $_group.cell)"
              v-on="$_cellEventListeners">
            </component>
          </td>
          <td v-if="$_group.colspan && ($_flattenColumns.length - $_group.colspan > 0)"
            :class="['st-group-cell', classes.groupCell]" :style="styles.groupCell"
            :colspan="$_flattenColumns.length - $_group.colspan"></td>
        </tr>
        <!-- generate group's data row -->
        <tr v-for="crow in row.children" :key="id ? crow.value[id] : (crow.rowIndex + '-' + crow.rowIndex)"
          :class="['st-row', classes.row]" :style="styles.row">
          <td v-if="$_picker" :class="['st-cell st-row-picker', classes.cell]" :style="styles.cell">
            <component ref="rowPicker" :is="$_picker.component"
              v-bind="Object.assign({
                cellIndex: 0, 
                value: $_picker.id ? crow.value[$_picker.id] : null,
                row: crow
              }, $_picker)"
              v-on="$_rowEventListeners"
              v-on:pick="$_rowPickEvent">
            </component>
          </td>
          <td v-for="(column, columnIndex) in $_flattenColumns" :key="column.id"
            :class="['st-cell', classes.cell, column.class, 
              columnIndex === 0 && $_group.indent !== false ? (typeof($_group.indent) === 'string' ? $_group.indent : 'st-indent') : null]"
            :style="[styles.cell, column.style]">
            <component :is="$_getCellComponent(column)"
              v-bind="Object.assign({
                id: column.id,
                cellIndex: columnIndex, 
                value: crow.value[column.id],
                row: crow
              }, column.cell)"
              v-on="$_cellEventListeners">
            </component>
          </td>
        </tr>
      </template>
      <template v-else>
        <!-- generate data row -->
        <tr :key="id ? row.value[id] : row.rowIndex" :class="['st-row', classes.row]" :style="styles.row">
          <td v-if="$_picker" :class="['st-cell st-row-picker', classes.cell]" :style="styles.cell">
            <component ref="rowPicker" :is="$_picker.component"
              v-bind="Object.assign({
                cellIndex: 0, 
                value: $_picker.id ? row.value[$_picker.id] : null,
                row: row
              }, $_picker)"
              v-on="$_rowEventListeners"
              v-on:pick="$_rowPickEvent">
            </component>
          </td>
          <td v-for="(column, columnIndex) in $_flattenColumns" :key="column.id"
            :class="['st-cell', classes.cell, column.class]" :style="[styles.cell, column.style]">
            <component :is="$_getCellComponent(column)"
              v-bind="Object.assign({
                id: column.id,
                cellIndex: columnIndex, 
                value: row.value[column.id],
                row: row
              }, column.cell)"
              v-on="$_cellEventListeners">
            </component>
          </td>
        </tr>
      </template>
    </template>
  </tbody>
</table>
</template>

<script>
import colgroup from "simter-vue-colgroup";
import thead from "simter-vue-thead";
import flatten from "./utils/flatten";
import group from "./utils/group";

// inner cell components
import cellBase from "./cell/base";
import cellText from "./cell/text.vue";
import cellHtml from "./cell/html.vue";
import cellRowPicker from "./cell/row-picker.vue";
import cellRowNumber from "./cell/row-number.vue";
import cellTextEditor from "./cell/text-editor.vue";
import cellNumberEditor from "./cell/number-editor.vue";

const component = {
  props: {
    // predicate whether to generate the thead element
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
    group: { type: [String, Object], required: false },
    picker: { type: [Boolean, String, Object], required: false, default: false },
    id: { type: String, required: false }
  },
  data() {
    return { rowsExt: [], selection: [] };
  },
  created() {
    this.generateRowsHelper();
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     * It gather all columns leaf to return.
     */
    $_flattenColumns() {
      return flatten(this.columns);
    },
    /** The header columns */
    $_headerColumns() {
      if (this.$_picker)
        return [
          {
            label: this.$_picker.label || " ",
            width: this.$_picker.width
          }
        ].concat(this.columns);
      else return this.columns;
    },
    /** Polishing the `picker` config to a standard Object format */
    $_picker() {
      return typeof this.picker === "string"
        ? { component: this.picker }
        : this.picker === true
          ? { component: "st-cell-row-picker" }
          : this.picker;
    },
    /** Polishing the `group` config to a standard Object format */
    $_group() {
      if (this.group == null) return { predicate: false };
      else if (typeof this.group === "string")
        return { id: this.group, predicate: true, indent: true };
      else if (
        typeof this.group === "function" ||
        typeof this.group === "boolean"
      )
        return { id: "group", predicate: this.group, indent: true };
      else return this.group;
    },
    /** Filter all cell event listeners by prefix 'cell-' */
    $_cellEventListeners() {
      const cl = {};
      Object.keys(this.$listeners)
        .filter(key => key.startsWith("cell-"))
        .forEach(key => {
          cl[key.substr(5)] = this.$listeners[key];
        });
      //console.log("cellEventListeners=%s", Object.keys(cl).join(", "));
      return cl;
    },
    /** Filter all row event listeners by prefix 'row-' */
    $_rowEventListeners() {
      const cl = {};
      Object.keys(this.$listeners)
        .filter(key => key.startsWith("row-"))
        .forEach(key => {
          cl[key.substr(4)] = this.$listeners[key];
        });
      //console.log("rowEventListeners=%o", cl);
      return cl;
    }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead,

    "st-cell-text": cellText,
    "st-cell-html": cellHtml,
    "st-cell-row-picker": cellRowPicker,
    "st-cell-row-number": cellRowNumber,
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
    /** Predicate whether this row is a group row */
    $_isGroupRow(row) {
      if (typeof this.$_group.predicate === "function")
        return this.$_group.predicate.call(this, row);
      else if (typeof this.$_group.predicate === "boolean")
        return this.$_group.predicate;
      else return row(this.$_group.predicate);
    },
    $_rowPickEvent($event) {
      if ($event.picked) this.selection.push($event.row);
      else {
        const index = this.selection.indexOf($event.row);
        if (index > -1) this.selection.splice(index, 1);
      }
    },
    deleteSelection() {
      // 逆序排序
      const toRemove = this.selection.sort((r1, r2) => {
        if (!r1.group && !r2.group) {
          // 同为 1 级节点
          return r2.index - r1.index;
        } else if (r1.group && r2.group) {
          // 同为 2 级节点
          const d = r2.group.index - r1.group.index;
          return d == 0 ? r2.index - r1.index : d;
        } else if (r1.group && !r2.group) {
          // 1 级节点与 2 级节点
          return r2.index - r1.group.index;
        } else {
          // 2 级节点与 1 级节点
          return r2.group.index - r1.index;
        }
      });

      // 逆向从数组中删除元素
      toRemove.forEach(row => {
        if (row.group) {
          this.$delete(this.rows[row.group.index].children, row.index);
        } else this.$delete(this.rows, row.index);
      });
      this.selection = []
    },
    generateRowsHelper() {
      // generate rows helper to save some specific data.
      // It has a same length with rows
      // [{value, index, rowIndex, children}, ...]
      const helper = [];
      let nextRowIndex = 0;
      this.rows.forEach((row, i) => {
        const _row = {
          value: row,
          index: i,
          rowIndex: nextRowIndex++,
          isGroupRow: this.$_isGroupRow(row)
        };
        helper.push(_row);
        if (_row.isGroupRow) {
          _row.children = [];
          row.children.forEach((crow, j) => {
            const _crow = {
              value: crow,
              index: j,
              rowIndex: nextRowIndex++,
              group: _row
            };
            _row.children.push(_crow);
          });
        }
      });
      this.rowsExt = helper;
    }
  },
  watch: {
    rows: {
      deep: true,
      handler() {
        //console.log("st-table : rows change");
        this.generateRowsHelper();
      }
    },
    group: {
      deep: true,
      handler() {
        //console.log("st-table : group change");
        this.generateRowsHelper();
      }
    },
    selection(value) {
      // 1. first param is the origin leaf row data.
      // 2. second param is [{value, rowIndex, index, group}, ...], value is the origin leaf row data, all defined in cellBase.
      if ("selection-change" in this.$listeners)
        this.$emit("selection-change", value.map(v => v.value), value);
    }
  }
};

export {
  cellBase,
  cellText,
  cellHtml,
  cellRowPicker,
  cellRowNumber,
  cellTextEditor,
  cellNumberEditor,
  group,
  colgroup as stTableColgroup,
  thead as stTableThead,
  flatten
};
export default component;
</script>