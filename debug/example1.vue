<template>
<div class="block example">
  <h2>Example 1 : Simple Columns</h2>
  <st-table :columns="columns" :rows="rows" border="1"></st-table>
  <pre v-pre>// Expected :
| Sn |  X1  |  X2  |
| 1  | v1-1 | v2-1 |
| 2  | v1-2 | v2-2 |
| 3  | v1-3 |      |</pre>
</div>
</template>

<script>
import table from "../src/table.vue";
export default {
  data() {
    return {
      columns: [
        { id: "key1", label: "Sn", width: "50px" },
        { id: "key2", label: "X1", width: "100px" },
        { id: "key3", label: "X2", width: "50px" }
      ],
      rows: [
        { key1: 1, key2: "v1-1", key3: "v2-1" },
        { key1: 2, key2: "v1-2", key3: "v2-2" },
        { key1: 3, key2: "v1-3" }
      ]
    };
  },
  components: {
    "st-table": table
  }
};
</script>