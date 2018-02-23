<template>
<table class="st-table">
  <colgroup is="st-colgroup" :columns="columns"></colgroup>
  <thead is="st-thead" :columns="columns"></thead>
  <tbody>
    <tr v-for="(row, index) in rows" :key="row.id || index">
      <td v-for="column in columns" :key="column.id">{{row[column.id]}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import colgroup from "simter-vue-colgroup";
import thead from "simter-vue-thead";

export default {
  replace: true,
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: false, default: [] }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead
  }
};
</script>

<style>
.st-table {
  border-collapse: collapse;
  table-layout: fixed;
}
</style>
