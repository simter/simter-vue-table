<template>
<form style="height: 100%; padding: 1em; box-sizing: border-box;"
  :class="ui.dark ? 'dark' : ''"
  :style="ui.dark ? ui.darkStyle : ui.lightStyle">
  <div class="title">
    <h2 class="ui-priority-primary" style="margin: 0 0 .5em 0">
      Browser default UI
      <div class="ui-priority-secondary" style="float: right; font-size: 60%">Theme :
        <label><input type="radio" v-model="ui.dark" :value="true"> Dark</label>
        <label><input type="radio" v-model="ui.dark" :value="false"> Light</label>
      </div>
    </h2>
  </div>
  <div class="options">
    <label>Options：</label>
    <div class="option">
      <label><input type="checkbox" v-model="ui.showRowNumber"> Display row number</label>
    </div>
    <div class="option">
      <label><input type="checkbox" v-model="ui.showRowPicker"> Display row picker</label>
    </div>
    <div class="option">
      <label><input type="checkbox" v-model="ui.expandFolder"> Expand folder</label>
      <span v-if="ui.expandFolder">
        (colspan=<input type="number" v-model="ui.groupCellColspan" min="1" :max="columns.length">)
      </span>
    </div>
    <div class="option">
      <label><input type="checkbox" v-model="ui.editable"> Editable</label>
    </div>
    <div class="option">
      Table : border=<input type="number" v-model="ui.tableBorderWidth" min="0" max="9">
      <label><input type="checkbox" v-model="ui.tableBorderCollapse">border-collapse=collapse</label>
    </div>
  </div>
  <br>
  <div class="template">
    <st-table ref="myTable" id="id"
      :columns="columns" :rows="rows" :group="group"
      :classes="classes" 
      :styles="{table: ui.dark ? 'border-color: #fff' : 'border-color: #000'}"
      :border="ui.tableBorderWidth"
      :style="ui.tableBorderCollapse ? 'border-collapse: collapse' : ''"
      :picker="picker"
      @cell-change="cellChangeEvent"
      @selection-change="selectionChangeEvent"
      @row-pick="rowPickEvent">
    </st-table>
  </div>
  <div class="options" style="border: none" v-if="selectionNames">
    <input type="button" @click.stop.prevent="deleteSelection()" value="删除选中的行">
    {{selectionNames}}
  </div>
</form>
</template>

<script>
import prettySize from "prettysize";
import table from "../../../src/table.vue";
export default {
  data() {
    return {
      ui: {
        dark: true,
        showRowNumber: true,
        showRowPicker: true,
        expandFolder: true,
        editable: false,
        tableBorderWidth: 1,
        groupCellColspan: 4,
        tableBorderCollapse: false,
        darkStyle: "background-color: #000; color: #fff;",
        lightStyle: "background-color: #fff; color: #000;"
      },
      classes: {
        headerRow: "st-header-row",
        headerCell: "st-header-cell"
      },
      rows: [
        {
          id: 11,
          type: "file",
          name: "Live Photo 1",
          ext: "png",
          size: 100,
          modifier: "RJ",
          modifyOn: "2018-01-01 12:30"
        },
        {
          id: 12,
          type: "file",
          name: "Live Photo 2",
          ext: "jpg",
          size: 123 * 1024,
          modifier: "John",
          modifyOn: "2018-01-01 12:35"
        },
        {
          id: 20,
          type: "folder",
          name: "Folder 1",
          children: [
            {
              id: 22,
              type: "file",
              name: "Maintain Pic 1",
              ext: "jpg",
              size: 123 * 1024 * 1024 * 1024,
              modifier: "David",
              modifyOn: "2018-01-01 12:40"
            },
            {
              id: 23,
              type: "file",
              name: "Maintain Record",
              ext: "docx",
              size: 100 * 1024 * 1024 * 1024 * 1024,
              modifier: "David",
              modifyOn: "2018-01-01 12:50"
            }
          ]
        },
        {
          id: 30,
          type: "folder",
          name: "Folder 2 - Empty",
          children: []
        },
        {
          id: 40,
          type: "file",
          name: "Changelog",
          ext: "md",
          size: 100 * 1024,
          modifier: "John",
          modifyOn: "2018-01-01 12:35"
        },
        {
          id: 50,
          type: "folder",
          name: "Folder 3",
          children: [
            {
              id: 51,
              type: "file",
              name: "File 1",
              ext: "jpg",
              size: 123 * 1024 * 1024 * 1024,
              modifier: "David",
              modifyOn: "2018-01-01 12:40"
            },
            {
              id: 52,
              type: "file",
              name: "File 2",
              ext: "docx",
              size: 100 * 1024 * 1024 * 1024 * 1024,
              modifier: "David",
              modifyOn: "2018-01-01 12:50"
            }
          ]
        }
      ],
      selectionNames: ""
    };
  },
  components: {
    "st-table": table
  },
  computed: {
    picker() {
      return this.ui.showRowNumber || this.ui.showRowPicker
        ? {
            component: "st-cell-row-picker",
            showNumber: this.ui.showRowNumber,
            showPicker: this.ui.showRowPicker
          }
        : false;
    },
    group() {
      return this.ui.expandFolder
        ? {
            id: "name",
            predicate(row) {
              return row.type === "folder";
            },
            colspan: this.ui.groupCellColspan,
            cell: this.ui.editable
              ? { component: "st-cell-text-editor", mutate: true }
              : { component: "st-cell-text" }
          }
        : null;
    },
    columns() {
      return [
        {
          id: "name",
          label: "Name",
          width: "16em",
          cell: this.ui.editable
            ? { component: "st-cell-text-editor", mutate: true }
            : { component: "st-cell-text" }
        },
        { id: "ext", label: "Type", width: "4em", cell: { class: "ext" } },
        {
          id: "size",
          label: "Size",
          width: "6em",
          class: "align-right",
          style: "text-align: right",
          cell: {
            component: "st-cell-text",
            render: function(value, row) {
              return prettySize(value);
            }
          }
        },
        {
          id: "modifyOn",
          label: "Last Modified",
          width: "13em",
          cell: {
            component: "st-cell-html",
            render: function(value, row) {
              return `${value} <i><u>${row.modifier}</u></i>`;
            }
          }
        }
      ];
    }
  },
  created() {
    document.body.style.backgroundColor = this.ui.dark ? "#000" : "#fff";
  },
  watch: {
    "ui.dark"(value) {
      document.body.style.backgroundColor = value ? "#000" : "#fff";
    }
  },
  mounted() {},
  methods: {
    rowPickEvent($event) {
      console.log("rowPickEvent=%o", $event);
    },
    cellChangeEvent($event) {
      console.log(
        "cell change RC[%d, %d]: newValue=%s, oldValue=%s, $event=%o",
        $event.row.rowIndex,
        $event.cellIndex,
        $event.newValue,
        $event.oldValue,
        $event
      );
    },
    cellClickEvent($event) {
      console.log(
        "cell click RC[%d, %d]: target=%s",
        $event.rowIndex,
        $event.columnIndex,
        $event.target
      );
    },
    deleteSelection($event) {
      this.$refs.myTable.deleteSelection();
    },
    selectionChangeEvent(selection) {
      this.selectionNames = selection.map(r => r.name).join(", ");
    }
  }
};
</script>