<template>
<table :class="$_classes.table">
  <colgroup is="st-colgroup" :columns="columns"></colgroup>
  <thead is="st-thead" :columns="columns" :class="$_classes.thead"></thead>
  <tbody :class="$_classes.tbody">
    <tr v-for="(row, index) in rows" :key="row.id || index">
      <td v-for="column in columnsLeaf" :key="column.id">{{row[column.id]}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import colgroup from "simter-vue-colgroup";
import thead from "simter-vue-thead";

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
    },
    classes: {
      type: String | Object | Array,
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
    },
    /**
     * Convert String | Array to Object {table: ...}
     */
    $_classes() {
      if (typeof this.classes === "string" || Array.isArray(this.classes))
        return { table: this.classes };
      else if (typeof this.classes === "object") return this.classes;
      else return {};
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