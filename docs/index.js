window.onload = function () {
  let table = window["simter-vue-table"].default;

  new Vue({
    el: "#sample1",
    data: {
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
    },
    components: {
      "st-table": table
    }
  });

  new Vue({
    el: "#sample2",
    data: {
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
    },
    components: {
      "st-table": table
    }
  });

  new Vue({
    el: "#sample3",
    data: {
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
            {
              label: "X22",
              children: [
                { id: "key321", label: "X221", width: "60px" },
                { id: "key322", label: "X222", width: "60px" }
              ]
            }
          ]
        }
      ],
      rows: [
        { key1: 1, key21: "v11-1", key22: "v12-1", key31: "v21-1", key321: "v221-1", key322: "v222-1" },
        { key1: 2, key21: "v11-2", key22: "v12-2", key31: "v21-2", key321: "v221-2" },
        { key1: 3, key21: "v11-3", key22: "v12-3", key31: "v21-3", key321: "v221-3", key322: "v222-3" }
      ]
    },
    components: {
      "st-table": table
    }
  });
};