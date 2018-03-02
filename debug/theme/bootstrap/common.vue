<template>
<div class="block">
  <div class="example">
    <st-table :columns="columns" :rows="rows" :classes="classes"></st-table>
  </div>
  <form class="highlight">
    <label>Options: (click # go to Bootstrap official document link)</label>
    <ul>
      <li>Header: 
        <label><input type="radio" name="header" v-model="classes.thead" value="thead-light">Light (.thead-light)</label>
        <label><input type="radio" name="header" v-model="classes.thead" value="thead-dark">Dark (.thead-dark)</label>
        <label><input type="radio" name="header" v-model="classes.thead" value="">NotSet</label>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#table-head-options" target="blank">#</a>
      </li>
      <li>
        <label><input type="checkbox" v-model="classes.table" value="table-dark">Dark (.table-dark)</label>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#examples" target="blank">#</a>
      </li>
      <li>
        <label><input type="checkbox" v-model="classes.table" value="table-striped">Striped rows (.table-striped)</label>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#striped-rows" target="blank">#</a>
      </li>
      <li>
        <label><input type="checkbox" v-model="classes.table" value="table-bordered">Bordered table (.table-bordered)</label>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#bordered-table" target="blank">#</a>
      </li>
      <li>
        <label><input type="checkbox" v-model="classes.table" value="table-hover">Hoverable rows (.table-hover)</label>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#hoverable-rows" target="blank">#</a>
      </li>
      <li>
        <label><input type="checkbox" v-model="classes.table" value="table-sm">Small table (.table-sm)</label>
        <a href="https://getbootstrap.com/docs/4.0/content/tables/#small-table" target="blank">#</a>
      </li>
    </ul>
  </form>
</div>
</template>

<script>
import table from "../../../src/table.vue";
export default {
  data() {
    return {
      classes: {
        table: ["table", "table-bordered", "table-hover"],
        thead: "", 
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
  }
};
</script>