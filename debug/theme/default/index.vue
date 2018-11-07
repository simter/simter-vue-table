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
      <label><input type="checkbox" v-model="ui.groupable"> Groupable</label>
    </div>
    <div class="option">
      <label><input type="checkbox" v-model="ui.editable"> Cell editable</label>
    </div>
    <div class="option">
      Table border width: <input type="number" v-model="ui.tableBorderWidth" min="0">
    </div>
    <div class="option">
      Table style: <input type="checkbox" v-model="ui.tableBorderCollapse">'border-collapse: collapse'
    </div>
  </div>
  <br>
  <div class="template">
    <st-table ref="myTable" :columns="columns" :rows="rows"
      :classes="classes" :group="group" picked-prop="picked"
      :border="ui.tableBorderWidth" :style="ui.tableBorderCollapse ? 'border-collapse: collapse' : ''"
      @cell-change="cellChange"
      @cell-click="cellClick"
      @selection-change="selectionChange">
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
        groupable: true,
        editable: true,
        tableBorderWidth: 1,
        darkStyle: "background-color: #000; color: #fff;",
        lightStyle: "background-color: #fff; color: #000;"
      },
      classes: {},
      rows: [
        {
          id: 11,
          group: "Group1",
          name: "Live Photo 1",
          ext: "png",
          size: 100,
          updater: "RJ",
          updateTime: "2018-01-01 12:30"
        },
        {
          id: 12,
          group: "Group1",
          name: "Live Photo 2",
          ext: "jpg",
          size: 123 * 1024,
          updater: "John",
          updateTime: "2018-01-01 12:35"
        },
        {
          id: 21,
          group: "Group2",
          name: "Maintain Pic 1",
          ext: "png",
          size: 123.456 * 1024 * 1024,
          updater: "John",
          updateTime: "2018-01-01 12:30"
        },
        {
          id: 22,
          group: "Group2",
          name: "Maintain Pic 2",
          ext: "jpg",
          size: 123 * 1024 * 1024 * 1024,
          updater: "David",
          updateTime: "2018-01-01 12:40"
        },
        {
          id: 23,
          group: "Group2",
          name: "Maintain Record",
          ext: "docx",
          size: 100 * 1024 * 1024 * 1024 * 1024,
          updater: "David",
          updateTime: "2018-01-01 12:50"
        }
      ],
      selectionNames: ""
    };
  },
  components: {
    "st-table": table
  },
  computed: {
    group() {
      return this.ui.groupable
        ? {
            prop: "group",
            names: ["Group1", "DefaultGroupA", "DefaultGroupB"],
            selectable: this.ui.showRowPicker,
            cell: this.ui.editable
              ? { component: "st-cell-text-editor" }
              : { component: "st-cell-text" }
          }
        : "";
    },
    columns() {
      return [
        {
          id: "id",
          label: "ID",
          width: "4em",
          cell: this.ui.showRowPicker
            ? {
                component: "st-cell-row-picker",
                showRowNumber: this.ui.showRowNumber
              }
            : {
                component: this.ui.showRowNumber
                  ? "st-cell-row-number"
                  : "st-cell-text"
              }
        },
        {
          id: "name",
          label: "Name",
          width: "16em",
          cell: this.ui.editable
            ? { component: "st-cell-text-editor" }
            : { component: "st-cell-text" }
        },
        { id: "ext", label: "Type", width: "3em", cell: { class: "ext" } },
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
          id: "updateTime",
          label: "UpdateTime",
          width: "13em",
          cell: {
            component: "st-cell-html",
            render: function(value, row) {
              return `${value} <i><u>${row.updater}</u></i>`;
            }
          }
        }
      ];
    }
  },
  watch: {},
  mounted() {},
  methods: {
    cellChange($event) {
      console.log(
        "cell change RC[%d, %d]: newValue=%s, oldValue=%s, $event=%o",
        $event.rowIndex,
        $event.columnIndex,
        $event.newValue,
        $event.oldValue,
        $event
      );
    },
    cellClick($event) {
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
    selectionChange(selection, oldValue) {
      this.selectionNames = selection.map(r => r.name).join(", ");
      console.log(
        "selectionChange: new=%s, old=%s",
        this.selectionNames,
        oldValue.map(r => r.name).join(", ")
      );
    }
  }
};
</script>