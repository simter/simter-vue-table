window.onload = function () {
  let table = window["simter-vue-table"].default;

  new Vue({
    el: "#sample1",
    data: {
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
    },
    components: {
      "st-table": table
    }
  });
};