<template>
<form style="padding:1em">
  <div class="title">
    <h2>
      <a href="https://getbootstrap.com/docs/4.0/content/tables/" class="text-primary">Bootstrap UI 4.x</a>
      <span class="text-muted" style="font-size: 50%">Integration</span>
      <div class="text-muted" style="float: right; font-size: 60%">Theme :
        <select class="form-control" style="padding: 0.2em; display: inline-block; width: auto"
          v-model="ui.theme" @change="changeTheme">
          <option v-for="(value, key) in ui.themes" v-bind:key="key">{{ key }}</option>
        </select>
      </div>
    </h2>
  </div>
  <div class="template">
    <st-table :columns="columns" :rows="rows" :classes="classes"></st-table>
  </div>
  <div class="options">
    <label>Bootstrap Options: (click § go to Bootstrap official document link)</label>
    <ul style="list-style: none; padding: 0; margin: 0">
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#bordered-table" target="blank">§</a>
        <label>
          <input type="checkbox" v-model="ui.borderedTable"> Bordered table
        </label>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#hoverable-rows" target="blank">§</a>
        <label>
          <input type="checkbox" v-model="ui.hoverableRows"> Hoverable rows
        </label>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#striped-rows" target="blank">§</a>
        <label>
          <input type="checkbox" v-model="ui.stripedRows"> Striped rows
        </label>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#small-table" target="blank">§</a>
        <label>
          <input type="checkbox" v-model="ui.smallTable"> Small table
        </label>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#examples" target="blank">§</a>
        <label>
          <input type="checkbox" v-model="ui.darkTable"> Dark table
        </label>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#table-head-options" target="blank">§</a>
          <label>
            <input type="radio" v-model="ui.tableHeader" value=""> Not Set
          </label>
          <label>
            <input type="radio" v-model="ui.tableHeader" value="thead-dark"> Dark Header
          </label>
          <label>
            <input type="radio" v-model="ui.tableHeader" value="thead-light"> Light Header
          </label>
      </li>
    </ul>
  </div>
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
        hoverableRows: true,
        stripedRows: false,
        smallTable: false,
        darkTable: false,

        theme: "Cyborg",
        themes: {
          "Default": "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css",
          "Cyborg": "https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/cyborg/bootstrap.min.css"
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
        { sn: 3, first: "Larry", last: "the Bird", handle: "@twitter" }
      ]
    };
  },
  components: {
    "st-table": table
  },
  computed: {
    classes() {
      const cs = {
        table: ["table"],
        thead: ""
      };

      cs.thead = this.ui.tableHeader;
      if (this.ui.borderedTable) cs.table.push("table-bordered");
      if (this.ui.hoverableRows) cs.table.push("table-hover");
      if (this.ui.stripedRows) cs.table.push("table-striped");
      if (this.ui.smallTable) cs.table.push("table-sm");
      if (this.ui.darkTable) cs.table.push("table-dark");
      return cs;
    }
  },
  mounted(){
    // get all bootswatch themes
    fetch("https://bootswatch.com/api/4.json")
    .then(response => response.json())
    .then(result => {
      console.log("find %s themes from https://bootswatch.com/api/4.json", result.themes.length);
      result.themes.forEach(theme => {
        if(!this.ui.themes.hasOwnProperty(theme.name)) this.$set(this.ui.themes, theme.name, theme.cssCdn);
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