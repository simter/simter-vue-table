import table from '../src/table.vue'

window.onload = function () {
  Vue.component('st-table', table)

  new Vue({
    el: "#demo1",
    data: {
      columns: [
        { id: "id1", label: "Column1", width: "100px" },
        { id: "id2", label: "Column2", width: "150px" },
        { id: "id3", label: "Column3", width: "200px" }
      ],
      rows: [
        { id1: "v11", id2: "v21", id3: "v31" },
        { id1: "v12", id2: "v22", id3: "v32" },
        { id1: "v13", id2: "v23", id3: "v33" }
      ]
    }
  })
}