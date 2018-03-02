/*!
* simter-vue-table v0.3.0
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
/*!
* simter-vue-colgroup v0.2.6
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
const component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('colgroup',_vm._l((_vm.widthArray),function(width,index){return _c('col',{key:index,style:({width: width})})}))},staticRenderFns: [],
  replace: true,
  props: {
    // The column's 'width' config array, like ['20px', '40px', ...]
    columns: { type: Array, required: true }
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     */
    widthArray() {
      return flatten(this.columns);
    }
  }
};

/**
 * Flatten complex object array to simple string array.
 *
 * Just deal with object's 'width' and 'children' key.
 *
 * Example :
 * 1. ['20px', '40px', ...] flatten to ['20px', '40px', ...]
 * 2. [{width: '20px'}, {width: '40px'}, ...] flatten to ['20px', '40px', ...]
 * 3. [{width: '20px'}, {children: [{width: '40px'}, {width: '60px'}]}, ...]
 *    flatten to ['20px', '40px', '60px', ...]
 */
const flatten = columns =>
  columns
    .reduce(
      (a, b) => a.concat(b.children ? flatten(b.children) : b.width || b),
      []
    )
    .map(a => (typeof a === "object" ? a.width : a));

/*!
* simter-vue-thead v0.2.1
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
const component$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{class:_vm.containerClass},_vm._l((_vm.rows),function(row,rowIndex){return _c('tr',{key:'row-' + rowIndex,class:_vm.rowClass},_vm._l((row),function(cell,cellIndex){return _c('th',{key:'cell-' + cellIndex,class:cell.class || _vm.cellClass,attrs:{"colspan":cell.colspan,"rowspan":cell.rowspan}},[_vm._v(_vm._s(cell.label || cell))])}))}))},staticRenderFns: [],
  replace: true,
  props: {
    // The column's 'label' config array, like ['Column1', 'Column2', ...]
    columns: { type: Array, required: true },
    // The thead tag class
    containerClass: { type: String, required: false },
    // The tr tag class
    rowClass: { type: String, required: false },
    // The th tag class
    cellClass: { type: String, required: false }
  },
  computed: {
    /** 
     * The result of function call transform(this.columns).
     */
    rows() {
      return transform(deepClone(this.columns));
    }
  }
};

/**
 * Transform the origin string or lable/children config to matched trs array config.
 *
 * Rules :
 * 1. rowspan
 * 1.1. if has children, it equals to 1. And just ignore setting.
 * 1.2. if has no children, it equals to the max siblings descendant depth + 1. Ignore setting if rowspan is 1.
 * 2. colspan equals to its tree leaf node count. Ignore setting if colspan is 1.
 *
 * Examples :
 * 1. ["X1", "X2"] transform to [ [{label: "X1"}, {label: "X2"}] ]
 * 2. ["X1", {label: "X2", children: ["X21", "X22"]}]
 *    transform to [
 *      [{label: "X1", rowspan: 2}, {label: "X2", colspan: 2}],
 *      [{label: "X21"}, {label: "X22"}]
 *    ]
 * 3. [
 *      "X1",
 *      {
 *        label: "X2",
 *        children: [
 *          {
 *            label: "X21",
 *            children: ["X211", "X212"]
 *          },
 *          "X22"
 *        ]
 *      }
 *    ]
 *    transform to [
 *      [{label: "X1", rowspan: 3}, {label: "X2", colspan: 3}],
 *      [{label: "X21", colspan: 2}, {label: "X22", rowspan: 2}],
 *      [{label: "X211"}, {label: "X212"}]
 *    ]
 */
function transform(columns) {
  // Polishing String item to Object item
  columns = polishing(columns);

  columns.forEach(column => {
    // set $_rowIndex and $_depth
    descendantDepth(column);

    // set colspan
    leafCount(column);
  });

  // group by $_rowIndex
  const rows = flattenWithSelf(columns, true).reduce(function(result, column) {
    if (!result[column.$_rowIndex]) result[column.$_rowIndex] = [column];
    else result[column.$_rowIndex].push(column);
    return result;
  }, []);

  // calculate each column's rowspan
  rows.forEach(row => {
    row.forEach(column => {
      if (column.$_depth === 0) {
        // no children
        // rowspan = max(siblings.$_depth) + 1
        const depth = row
          .filter(c => c !== column)
          .reduce((a, b) => Math.max(a, b.$_depth), 0);
        if (depth > 0) column.rowspan = depth + 1;
      }
    });
  });

  // remove $_rowIndex and $_depth
  rows.forEach(row => {
    row.forEach(column => {
      delete column.$_rowIndex;
      delete column.$_depth;
    });
  });

  return rows;
}

/**
 * Change Array's String item to Object item.
 * All nested item in children will be changed also.
 * Attention: this method maybe change the origin array.
 *
 * Examples:
 * 1. "X1" polishing to {label: "X1"}.
 * 2. {"X1", children: ["X11", "X12"] polishing to
 *    {label: "X1", children: [{label: "X11"}, {label: "X12"}] }.
 */
function polishing(columns) {
  // Polishing String item to Object item
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    if (typeof column === "object") {
      if (column.children) column.children = polishing(column.children);
    } else columns[i] = { label: column };
  }
  return columns;
}

/**
 * Calculate the descendant depth and set to $_depth property.
 *
 * It equals to the nested children level.
 *
 * Example :
 * 1. {label: "X0"}.depth = 0
 * 2. {label: "X0", children: ["X1"]}.depth = 1
 * 3. {label: "X0", children: [{label: "X1", children: ["X2"]}]}.depth = 2
 */
function descendantDepth(column) {
  if (!column.hasOwnProperty("$_rowIndex")) column.$_rowIndex = 0; // parent $_rowIndex

  let d;
  if (column.children && column.children.length > 0) {
    d = 0;
    column.children.forEach(child => {
      child.$_rowIndex = column.$_rowIndex + 1; // child $_rowIndex
      d = Math.max(d, descendantDepth(child));
    });
    d++; // = maxChildDepth + 1
  } else d = 0;

  column.$_depth = d;
  return d;
}

/**
 * Calculate the leaf node count and set to colspan property.
 * If the node has no children, the leaf count equals to 1.
 *
 * Example :
 * 1. { label: "X1"}.hasOwnProperty("colspan") == false
 * 2. { label: "X1", children: [{label: "X11"}]}.hasOwnProperty("colspan") == false
 * 3. { label: "X1", children: [{label: "X11"}, {label: "X12"}]}.colspan = 2
 * 4. { label: "X1", children: [
 *      { label: "X11"},
 *      { label: "X12", children: [{label: "X121"}, {label: "X122"}]}
 *    ]}.colspan = 3
 */
function leafCount(column) {
  let count;
  if (column.children && column.children.length > 0) {
    count = 0;
    column.children.forEach(child => {
      count += leafCount(child);
    });
  } else count = 1;
  if (count > 1) column.colspan = count;
  return count;
}

/**
 * Flatten the array items with itself and its children items.
 *
 * Attention: if removeChildren is true, the origin columns param maybe changed.
 *
 * Example :
 * 1. ["a", "b"] flatten to ["a", "b"]
 * 2. ["a", {children: ["b", "c"]}] flatten to ["a", {children: ["b", "c"]}, "b", "c"]
 */
function flattenWithSelf(columns, removeChildren = true) {
  let result = columns.reduce((a, b) => {
    if (b.children) {
      return a.concat(b, flattenWithSelf(b.children, removeChildren));
    } else return a.concat(b);
  }, []);

  if (removeChildren)
    result.forEach(column => {
      if (column.hasOwnProperty("children")) delete column.children;
    });

  return result;
}

/**
 * Deep copy a object.
 *
 * From https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object#answer-728694
 */
function deepClone(obj) {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" !== typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

const component$2 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{class:_vm.$_classes.table},[_c("st-colgroup",{tag:"colgroup",attrs:{"columns":_vm.columns}}),_vm._v(" "),_c("st-thead",{tag:"thead",class:_vm.$_classes.thead,attrs:{"columns":_vm.columns}}),_vm._v(" "),_c('tbody',{class:_vm.$_classes.tbody},_vm._l((_vm.rows),function(row,index){return _c('tr',{key:row.id || index},_vm._l((_vm.columnsLeaf),function(column){return _c('td',{key:column.id},[_vm._v(_vm._s(row[column.id]))])}))}))])},staticRenderFns: [],
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
      return flatten$1(this.columns);
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
    "st-colgroup": component,
    "st-thead": component$1
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
function flatten$1(columns) {
  return columns.reduce(
    (a, b) => a.concat(b.children ? flatten$1(b.children) : b),
    []
  );
}

export default component$2;
export { flatten$1 as flatten };
