<template>
<form style="padding:1em">
  <div class="title">
    <h2 class="ui-priority-primary" style="margin: 0 0 .5em 0">
      事故附件
      <span class="ui-priority-secondary" style="font-size: 50%"><a href="https://jqueryui.com">jQuery UI Integration</a></span>
      <div class="ui-priority-secondary" style="float: right; font-size: 60%">Theme :
        <select class="ui-widget-content" style="padding: 0.2em; display: inline-block; width: auto"
          v-model="ui.theme" @change="changeTheme">
          <option v-for="(value, key) in ui.themes" v-bind:key="key">{{ key }}</option>
        </select>
      </div>
    </h2>
  </div>
  <div class="options">
    <label>配置选项：</label>
    <div class="option">
      <label>边框控制 : </label>
      <span class="field">
        <label><input type="checkbox" v-model="ui.borderClasses" value="no-outer-border"> 隐藏外边框</label>
      </span>
      <span class="field">
        <label><input type="checkbox" v-model="ui.borderClasses" value="no-column-border"> 隐藏表格的垂直分隔线</label>
      </span>
      <span class="field">
        <label><input type="checkbox" v-model="ui.borderClasses" value="no-row-border"> 隐藏表格的水平分隔线</label>
      </span>
    </div>
    <div class="option">
      <label><input type="checkbox" v-model="ui.group"> 分组显示</label>
    </div>
    <div class="option">
      <label><input type="checkbox" v-model="ui.editable"> 可编辑的单元格</label>
    </div>
  </div>
  <br>
  <div class="template">
    <st-table ref="myTable" :columns="columns" :rows="rows"
      :classes="classes" :group="group" picked-prop="picked"
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
import { default as table, integration } from "../../../../src/table.vue";
const classes = integration.jqui.classes;
const cell = integration.jqui.cell;
const groupConfig = {
  prop: "group",
  names: ["流程类", "诉讼类"],
  cell: cell("st-cell-text-editor", {
    styles: { input: "width: 15em" }
  })
};
export default {
  data() {
    return {
      ui: {
        borderClasses: [],
        group: true,
        editable: true,

        theme: "dark-hive",
        themes: {
          base:
            "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/base/jquery-ui.min.css",
          "dark-hive":
            "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/dark-hive/jquery-ui.min.css"
        }
      },
      group: "",
      rows: [
        {
          sn: 11,
          group: "现场照片",
          name: "现场照片1",
          ext: "png",
          size: "1",
          unit: "KB",
          updater: "黄小明",
          updateTime: "2018-01-01 12:30"
        },
        {
          sn: 12,
          group: "现场照片",
          name: "现场照片2",
          ext: "jpg",
          size: "10",
          unit: "KB",
          updater: "黄小张",
          updateTime: "2018-01-01 12:35"
        },
        {
          sn: 21,
          group: "维修类",
          name: "维修类照片1",
          ext: "png",
          size: "1",
          unit: "MB",
          updater: "黄小明",
          updateTime: "2018-01-01 12:30"
        },
        {
          sn: 22,
          group: "维修类",
          name: "维修类照片2",
          ext: "jpg",
          size: "1.5",
          unit: "MB",
          updater: "黄小张",
          updateTime: "2018-01-01 12:40"
        },
        {
          sn: 23,
          group: "维修类",
          name: "维修记录",
          ext: "docx",
          size: "2",
          unit: "MB",
          updater: "黄小张",
          updateTime: "2018-01-01 12:50"
        }
      ],
      selectionNames: ""
    };
  },
  components: {
    "st-table": table
  },
  created() {
    this.group = this.$_group;
  },
  computed: {
    classes() {
      return Object.assign({}, classes, {
        table: [].concat(classes.table, this.ui.borderClasses)
      });
    },
    $_group() {
      return {
        prop: "group",
        names: ["流程类", "诉讼类"],
        cell: cell(!this.ui.editable ? "st-cell-text" : "st-cell-text-editor", {
          styles: { input: "width: 15em" }
        })
      };
    },
    columns() {
      return [
        {
          id: "sn",
          label: "序号",
          width: "3em",
          cell: cell("st-cell-row-picker", { showRowNumber: true })
        },
        {
          id: "name",
          label: "名称",
          width: "16em",
          cell: cell(!this.ui.editable ? "st-cell-text" : "st-cell-text-editor")
        },
        { id: "ext", label: "类型", width: "3em", cell: { class: "ext" } },
        {
          label: "大小",
          children: [
            {
              id: "size",
              label: "大小",
              width: "4em",
              cell: cell(
                !this.ui.editable ? "st-cell-text" : "st-cell-number-editor"
              )
            },
            { id: "unit", label: "单位", width: "3em" }
          ]
        },
        {
          id: "updateTime",
          label: "更新时间",
          width: "13em",
          cell: cell("st-cell-html", {
            render: function(value, row) {
              return `${value} <i><u>${row.updater}</u></i>`;
            }
          })
        }
      ];
    }
  },
  watch: {
    "ui.group": function(value) {
      this.$set(this, "group", value ? this.$_group : "");
    }
  },
  mounted() {
    // get all themes
    let url =
      "https://data.jsdelivr.com/v1/package/npm/jquery-ui-built-themes@1.12.1";
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log("find %s themes from %s", result.files.length, url);
        result.files
          .filter(theme => theme.type === "directory")
          .forEach(theme => {
            if (!this.ui.themes.hasOwnProperty(theme.name))
              this.$set(
                this.ui.themes,
                theme.name,
                `https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/${
                  theme.name
                }/jquery-ui.min.css`
              );
          });
      });
  },
  methods: {
    changeTheme() {
      document.getElementById("theme").href = this.ui.themes[this.ui.theme];
    },
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