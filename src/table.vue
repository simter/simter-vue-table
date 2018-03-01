<template>
<table>
  <colgroup is="st-colgroup" :columns="columns"></colgroup>
  <thead is="st-thead" :columns="columns"></thead>
  <tbody>
    <tr v-for="(row, index) in rows" :key="row.id || index">
      <td v-for="column in columnsLeaf" :key="column.id">{{row[column.id]}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import colgroup from "simter-vue-colgroup";
import thead from "simter-vue-thead";

const defaultClasses = { table: "st-table" };
const component = {
  replace: true,
  props: {
    columns: { type: Array, required: true },
    rows: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     * It gather all columns leaf to return.
     */
    columnsLeaf() {
      return flatten(this.columns);
    }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead
  }
};

/**
 * Flatten all leaf object to simple object array.
 *
 * Example :
 * 1. [{id: 1}, {id: 2}]
 *    flatten to
 *    [{id: 1}, {id: 2}]
 * 2. [{id: 1}, {children: [{id: 2}, {id: 3}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}]
 * 3. [{id: 1}, {children: [{id: 2}, {children: [{id: 3}, {id: 4}]}]}]
 *    flatten to
 *    [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
 */
function flatten(columns) {
  return columns.reduce(
    (a, b) => a.concat(b.children ? flatten(b.children) : b),
    []
  );
}

export { flatten };
export default component;
</script>