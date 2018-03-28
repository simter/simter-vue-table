<template>
<form style="padding:1em">
  <div class="title">
    <h2 class="ui-priority-primary" style="margin: 0 0 .5em 0">
      <a href="https://jqueryui.com">jQuery UI</a>
      <span class="ui-priority-secondary" style="font-size: 50%">Integration</span>
      <div class="ui-priority-secondary" style="float: right; font-size: 60%">Theme :
        <select class="ui-widget-content" style="padding: 0.2em; display: inline-block; width: auto"
          v-model="ui.theme" @change="changeTheme">
          <option v-for="(value, key) in ui.themes" v-bind:key="key">{{ key }}</option>
        </select>
      </div>
    </h2>
  </div>
  <div class="template">
    <st-table :columns="columns" :rows="rows" :classes="classes"></st-table>
  </div>
  <!-- <div class="options" style="border: none">
    <label>Options:</label>
    <ul style="list-style: none; padding: 0; margin: 0">
      <li><label><input type="checkbox" v-model="ui.borderedTable"> Bordered table</label></li>
    </ul>
  </div> -->
</form>
</template>

<script>
import table from "../../../src/table.vue";
export default {
  data() {
    return {
      ui: {
        tableHeader: "",
        borderedTable: true,

        theme: "dark-hive",
        themes: {
          "base": "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/base/jquery-ui.min.css",
          "dark-hive": "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/dark-hive/jquery-ui.min.css"
        }
      },
      columns: [
        { id: "sn", label: "#", width: "40px" },
        { id: "first", label: "First", width: "100px" },
        { id: "last", label: "Last", width: "100px" },
        { id: "handle", label: "Handle" }
      ],
      rows: [
        { sn: 1, first: "Mark", last: "Otto", handle: "@mdo" },
        { sn: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
        { sn: 3, first: "Larry", last: "the Bird", handle: "@twitter" },
        { sn: 4, first: "Larry", last: "auto wrap the content?", handle: "@twitter" },
        { sn: 5, first: "Larry", last: "the Bird", handle: "@twitter" }
      ]
    };
  },
  components: {
    "st-table": table
  },
  computed: {
    classes() {
      const cs = {
        table: [],
        thead: ""
      };

      cs.thead = this.ui.tableHeader;

      return cs;
    }
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
    }
  }
};
</script>