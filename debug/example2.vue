<template>
<div class="block example">
  <h2>Example 2 : Group Columns</h2>
  <st-table :columns="columns" :rows="rows" border="1"></st-table>
  <pre v-pre>// Expected :
| Sn |      X1       |      X2       |
|    |  X11  |  X12  |  X21  |  X22  |
| 1  | v11-1 | v12-1 | v21-1 | v22-1 |
| 2  | v11-2 | v12-2 | v21-2 | v22-2 |
| 3  | v11-3 | v12-3 | v21-3 | v22-3 |</pre>
</div>
</template>

<script>
import table from "../src/table.vue";
export default {
  data() {
    return {
      columns: [
        { id: "key1", label: "Sn", width: "50px" },
        {
          label: "X1",
          children: [
            { id: "key21", label: "X11", width: "60px" },
            { id: "key22", label: "X12", width: "60px" }
          ]
        },
        {
          label: "X2",
          children: [
            { id: "key31", label: "X21", width: "60px" },
            { id: "key32", label: "X22", width: "60px" }
          ]
        }
      ],
      rows: [
        { key1: 1, key21: "v11-1", key22: "v12-1", key31: "v21-1", key32: "v22-1" },
        { key1: 2, key21: "v11-2", key22: "v12-2", key31: "v21-2", key32: "v22-2" },
        { key1: 3, key21: "v11-3", key22: "v12-3", key31: "v21-3" }
      ]
    };
  },
  components: {
    "st-table": table
  }
};
</script>