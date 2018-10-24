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
  <div class="template">
    <st-table :columns="columns" :rows="rows" :classes="classes"
              @cell-change="cellChange">
    </st-table>
  </div>
  <div class="options" style="border: none">
    <label>Options:</label>
    <ul style="list-style: none; padding: 0; margin: 0">
      <li><label><input type="checkbox" v-model="ui.borderedTable"> Bordered table</label></li>
    </ul>
  </div>
</form>
</template>

<script>
import table from "../../../../src/table.vue";
export default {
  data() {
    return {
      ui: {
        borderedTable: true,

        theme: "dark-hive",
        themes: {
          "base": "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/base/jquery-ui.min.css",
          "dark-hive": "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/dark-hive/jquery-ui.min.css"
        }
      },
      columns: [
        { id: "sn", label: "序号", width: "3em", 
          cell: {
            type: 'st-cell-row-picker', 
            showContent: true, 
            pickedProp: 'picked', 
            classes: { label: 'label', input: 'ui-widget-content', span: 'tt' }
          }
        },
        { id: "name", label: "名称", width: "16em", 
          cell: {
            type: 'st-cell-text-editor', 
            classes: { input: 'ui-widget-content' }
          }
        },
        { id: "ext", label: "类型", width: "3em", cell: { class: "ext" } },
        { label: "大小", children: [
          { id: "size", label: "大小", width: "4em", cell: { type: 'st-cell-number-editor', classes: {input: 'ui-widget-content'} } },
          { id: "unit", label: "单位", width: "3em" }
        ]},
        { id: "updateTime", label: "更新时间", width: "13em", 
          cell: { 
            type: 'st-cell-html', 
            render: function(value, row) { return `${value} <i><u>${row.updater}</u></i>`}
          }
        }
      ],
      rows: [
        {sn: 1, name: "现场照片1", ext: 'png', size: "1", unit: "KB", updater: "黄小明", updateTime: "2018-01-01 12:30", group: "现场照片"},
        {sn: 2, name: "现场照片2", ext: 'jpg', size: "10", unit: "KB", updater: "黄小张", updateTime: "2018-01-01 12:35", group: "现场照片"},
        {sn: 1, name: "维修类照片1", ext: 'png', size: "1", unit: "MB", updater: "黄小明", updateTime: "2018-01-01 12:30", group: "维修类"},
        {sn: 2, name: "维修类照片2", ext: 'jpg', size: "1.5", unit: "MB", updater: "黄小张", updateTime: "2018-01-01 12:40", group: "维修类"},
        {sn: 3, name: "维修记录", ext: 'docx', size: "2", unit: "MB", updater: "黄小张", updateTime: "2018-01-01 12:50", group: "维修类"}
      ],
      group: "group",
      classes: {
        thead: {
          tr: "st-header ui-widget-content",
          th: "st-cell"
        },
        row: "st-row ui-widget-content"
      }
    };
  },
  components: {
    "st-table": table
  },
  computed: {
  },
  mounted(){
    // get all themes
    let url = "https://data.jsdelivr.com/v1/package/npm/jquery-ui-built-themes@1.12.1";
    fetch(url)
    .then(response => response.json())
    .then(result => {
      console.log("find %s themes from %s", result.files.length, url);
      result.files.filter(theme => theme.type === "directory")
      .forEach(theme => {
        if(!this.ui.themes.hasOwnProperty(theme.name)) this.$set(this.ui.themes, theme.name, 
          `https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/${theme.name}/jquery-ui.min.css`);
      });
    })
  },
  methods: {
    changeTheme(){
      document.getElementById('theme').href = this.ui.themes[this.ui.theme];
    },
    cellChange($event) {
      console.log("RC[%d, %d]: newValue=%s, oldValue=%s, $event=%o", $event.rowIndex, $event.columnIndex, $event.newValue, $event.oldValue, $event);
    }
  }
};
</script>