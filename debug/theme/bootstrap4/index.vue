<template>
<form :class="'bg-' + ui.theme" style="padding:1em">
  <div class="title">
    <h3><a href="https://getbootstrap.com/docs/4.0/content/tables/">Bootstrap 4 UI</a>
    <div class="btn-group btn-group-sm" style="float:right">
      <label :class="{'btn btn-secondary': true, active: ui.theme === 'dark'}">
        <input type="radio" v-model="ui.theme" value="dark"> Dark
      </label>
      <label :class="{'btn btn-secondary': true, active: ui.theme === 'light'}">
        <input type="radio" v-model="ui.theme" value="light"> Light
      </label>
    </div>
    </h3>
  </div>
  <div class="template">
    <st-table :columns="columns" :rows="rows" :classes="classes"></st-table>
  </div>
  <div class="options">
    <label>Bootstrap Options: (click § go to Bootstrap official document link)</label>
    <ul>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#bordered-table" target="blank">§</a>
        <div class="btn-group btn-group-sm">
          <label :class="{'btn btn-secondary': true, active: ui.borderedTable}">
            <input type="checkbox" v-model="ui.borderedTable"> Bordered table
          </label>
        </div>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#hoverable-rows" target="blank">§</a>
        <div class="btn-group btn-group-sm">
          <label :class="{'btn btn-secondary': true, active: ui.hoverableRows}">
            <input type="checkbox" v-model="ui.hoverableRows"> Hoverable rows
          </label>
        </div>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#striped-rows" target="blank">§</a>
        <div class="btn-group btn-group-sm">
          <label :class="{'btn btn-secondary': true, active: ui.stripedRows}">
            <input type="checkbox" v-model="ui.stripedRows"> Striped rows
          </label>
        </div>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#small-table" target="blank">§</a>
        <div class="btn-group btn-group-sm">
          <label :class="{'btn btn-secondary': true, active: ui.smallTable}">
            <input type="checkbox" v-model="ui.smallTable"> Small table
          </label>
        </div>
      </li>
      <li>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#table-head-options" target="blank">§</a>
        <div class="btn-group btn-group-sm">
          <label :class="{'btn btn-secondary': true, active: ui.theme === 'dark'}">
            <input type="radio" v-model="ui.tableHeader" value=""> Not Set
          </label>
          <label :class="{'btn btn-secondary': true, active: ui.theme === 'light'}">
            <input type="radio" v-model="ui.tableHeader" value="thead-dark"> Dark Header
          </label>
          <label :class="{'btn btn-secondary': true, active: ui.tableHeader === 'light'}">
            <input type="radio" v-model="ui.tableHeader" value="thead-light"> Light Header
          </label>
        </div>
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
        theme: "dark",
        tableHeader: "",
        borderedTable: true,
        hoverableRows: true,
        stripedRows: false,
        smallTable: false
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

      cs.table.push("table-" + this.ui.theme);
      cs.thead = this.ui.tableHeader;
      if (this.ui.borderedTable) cs.table.push("table-bordered");
      if (this.ui.hoverableRows) cs.table.push("table-hover");
      if (this.ui.stripedRows) cs.table.push("table-striped");
      if (this.ui.smallTable) cs.table.push("table-sm");
      return cs;
    }
  }
};
</script>