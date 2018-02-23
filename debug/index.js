import table from '../src/table.vue'

window.onload = function () {
  new Vue({
    el: "#sample1",
    data: {
      columns: [
        { id: "key1", label: "Column1", width: "100px" },
        { id: "key2", label: "Column2", width: "120px" },
        { id: "key3", label: "Column3", width: "150px" }
      ],
      rows: [
        { key1: "v1-1", key2: "v2-1", key3: "v3-1" },
        { key1: "v1-2", key2: "v2-2", key3: "v3-2" },
        { key1: "v1-3", key2: "v2-3", key3: "v3-3" }
      ]
    },
    components: {
      "st-table": table
    }
  })

  new Vue({
    el: "#sample2",
    data: {
      columns: [
        { id: "key1", label: "Column1", width: "100px" },
        {
          label: "Column2",
          children: [
            { id: "key21", label: "Column21", width: "120px" },
            { id: "key22", label: "Column22", width: "130px" }
          ]
        },
        { id: "key3", label: "Column3", width: "150px" }
      ],
      rows: [
        { key1: "v1-1", key21: "v2-1-1", key22: "v2-2-1", key3: "v3-1" },
        { key1: "v1-2", key21: "v2-1-2", key22: "v2-2-2", key3: "v3-2" },
        { key1: "v1-3", key21: "v2-1-3", key22: "v2-2-3", key3: "v3-3" }
      ]
    },
    components: {
      "st-table": table
    }
  })
}