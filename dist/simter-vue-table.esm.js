/*!
* simter-vue-table v0.5.0
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
/*!
* simter-vue-colgroup v0.3.0
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
//
//
//
//
//
//

const component = {
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

/* script */
            const __vue_script__ = component;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "colgroup",
    _vm._l(_vm.widthArray, function(width, index) {
      return _c("col", { key: index, style: { width: width } })
    })
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component$$1 = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component$$1.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-colgroup\\src\\colgroup.vue";

    if (!component$$1.render) {
      component$$1.render = template.render;
      component$$1.staticRenderFns = template.staticRenderFns;
      component$$1._compiled = true;

      if (functional) component$$1.functional = true;
    }

    component$$1._scopeId = scope;

    return component$$1
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var colgroup = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

/*!
* simter-vue-thead v0.3.2
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const component$1 = {
  replace: true,
  props: {
    // The column's 'label' config array, like ['Column1', 'Column2', ...]
    columns: { type: Array, required: true },
    // element class: {thead: ..., tr: ..., th: ...}
    classes: {
      type: String | Object | Array,
      required: false,
      default() {
        return [];
      }
    },
    // element style: {thead: ..., tr: ..., th: ...}
    styles: {
      type: String | Object | Array,
      required: false,
      default() {
        return {};
      }
    }
  },
  computed: {
    /** 
     * The result of function call transform(this.columns).
     */
    rows() {
      return transform(deepClone(this.columns));
    },
    /**
     * Convert String | Array to Object {table: ...}
     */
    $_classes() {
      if (typeof this.classes === "string" || Array.isArray(this.classes))
        return { thead: this.classes };
      else if (typeof this.classes === "object") return this.classes;
      else return {};
    },
    /**
     * Convert String | Array to Object {table: ...}
     */
    $_styles() {
      if (typeof this.styles === "string" || Array.isArray(this.styles))
        return { thead: this.styles };
      else if (typeof this.styles === "object") return this.styles;
      else return {};
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

/* script */
            const __vue_script__$1 = component$1;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "thead",
    { class: _vm.$_classes.thead, style: _vm.$_styles.thead },
    _vm._l(_vm.rows, function(row, rowIndex) {
      return _c(
        "tr",
        {
          key: "row-" + rowIndex,
          class: _vm.$_classes.tr,
          style: _vm.$_styles.tr
        },
        _vm._l(row, function(cell, cellIndex) {
          return _c(
            "th",
            {
              key: "cell-" + cellIndex,
              class: cell.class || _vm.$_classes.th,
              style: cell.style || _vm.$_styles.th,
              attrs: { colspan: cell.colspan, rowspan: cell.rowspan }
            },
            [_vm._v(_vm._s(cell.label || cell))]
          )
        })
      )
    })
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component$$1 = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component$$1.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-thead\\src\\thead.vue";

    if (!component$$1.render) {
      component$$1.render = template.render;
      component$$1.staticRenderFns = template.staticRenderFns;
      component$$1._compiled = true;

      if (functional) component$$1.functional = true;
    }

    component$$1._scopeId = scope;

    return component$$1
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var thead = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

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

/**
 * Group rows.
 *  
 * var rows = [
 *   {g: 'b', id: 22}, 
 *   {g: 'a', id: 11}, 
 *   {g: 'b', id: 21}, 
 *   {id: 52}, 
 *   {id: 50}
 * ]
 * 
 * group by {prop: 'g', names: ['c', 'd']} :
 * 
 * [
 *   {rowIndex: 0, id: 'b', rows: [{g: 'b', id: 22}, {g: 'b', id: 21}]},
 *   {rowIndex: 3, id: 'a', rows: [{g: 'a', id: 11}]},
 *   {rowIndex: 5, id: undefined, rows: [{id: 52}, {id: 50}]},
 *   {rowIndex: 8, id: 'c', rows: []},
 *   {rowIndex: 9, id: 'd', rows: []}
 * ]
 */
function groupRows (rows, group) {
  const groupKey = group.prop;
  const gi = {}; // {gN: index, ...}
  let rowIndex = -1;
  let index = -1;
  const groupedRows = rows.reduce(function (rv, row) {
    // record the groupName index
    const g = row[groupKey];
    if (!(g in gi)) gi[g] = ++index;

    // generate a empty group item
    const i = gi[g];
    rv[i] = rv[i] || { rowIndex: ++rowIndex, id: row[groupKey], rows: [] };

    // push row item into group.rows
    rv[i].rows.push(row);
    rowIndex++;

    // recaculate all the next group item rowIndex
    for (let j = i + 1; j < rv.length; j++) rv[j].rowIndex++;

    return rv;
  }, []);

  if (group.names)
    group.names
      .filter(g => !(g in gi))
      .forEach(g => groupedRows[groupedRows.length] = {
        rowIndex: ++rowIndex, id: g, rows: []
      });

  return groupedRows;
}

var cellBase = {
  props: {
    // column
    columnIndex: { type: Number, required: true },
    column: { type: Object, required: true },

    // row
    rowIndex: { type: Number, required: true },
    row: { type: Object, required: true },

    // groupRow
    groupRow: { type: Object, required: false }
  },
  computed: {
    // cell config by column
    cfg() {
      return this.column.cell || {};
    },
    // cell backend value
    value() {
      return this.row[this.column.id];
    },
    // cell frontend content, text or html
    content() {
      return this.cfg.render
        // render(value, row)
        // can get more component instance data from `this`
        ? this.cfg.render.call(this, this.value, this.row)
        // origin value
        : this.value;
    },
    // zero base RC string, such as '[1, 3]'
    rc() {
      return `[${this.rowIndex}, ${this.columnIndex}]`;
    },
    // control each descendant dom element class
    classes() {
      return this.cfg.classes || {};
    },
    // control each descendant dom element style
    styles() {
      return this.cfg.styles || {};
    }
  },
  methods: {
    /** Accept the cell value change and emit cell-change event */
    acceptChange(prop, newValue, oldValue, target) {
      if (newValue != oldValue) {
        // console.log("acceptChange %s: newValue=%s, oldValue=%s", this.rc, newValue, oldValue);

        // update the row data
        this.$set(this.row, prop, newValue);

        // emit cell change event
        const data = {
          newValue, oldValue,
          columnIndex: this.columnIndex,
          column: this.column,
          rowIndex: this.rowIndex,
          row: this.row
        };
        if (target) data.target = target;
        this.$emit("cell-change", data);
      }
    }
  }
};

//
var script = { extends: cellBase };

/* script */
            const __vue_script__$2 = script;
            
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", [_vm._v(_vm._s(_vm.content))])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\cell\\text.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var cellText = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
var script$1 = { extends: cellBase };

/* script */
            const __vue_script__$3 = script$1;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\cell\\html.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var cellHtml = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
var script$2 = {
  extends: cellBase,
  computed: {
    // the prop name that holds the picker status value
    pickedProp() {
      return this.cfg.pickedProp || this.$parent.pickedProp || this.column.id || 'picked';
    },
    // the picker status
    picked: {
      get() {
        return this.row[this.pickedProp];
      },
      set(value) {
        this.acceptChange(this.pickedProp, value, !value, this.$el.firstElementChild);
      }
    }
  }
};

/* script */
            const __vue_script__$4 = script$2;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "label",
    { class: ["row-picker", _vm.classes.label], style: _vm.styles.label },
    [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.picked,
            expression: "picked"
          }
        ],
        class: _vm.classes.input,
        style: _vm.styles.input,
        attrs: { type: "checkbox" },
        domProps: {
          checked: Array.isArray(_vm.picked)
            ? _vm._i(_vm.picked, null) > -1
            : _vm.picked
        },
        on: {
          change: function($event) {
            var $$a = _vm.picked,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;
            if (Array.isArray($$a)) {
              var $$v = null,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.picked = $$a.concat([$$v]));
              } else {
                $$i > -1 &&
                  (_vm.picked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
              }
            } else {
              _vm.picked = $$c;
            }
          }
        }
      }),
      _vm._v(" "),
      _vm.cfg.showRowNumber
        ? _c("span", { class: _vm.classes.span, style: _vm.styles.span }, [
            _vm._v(
              _vm._s(
                _vm.groupRow
                  ? _vm.rowIndex - _vm.groupRow.rowIndex
                  : _vm.rowIndex + 1
              )
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.cfg.showContent
        ? _c("span", { class: _vm.classes.span, style: _vm.styles.span }, [
            _vm._v(_vm._s(_vm.content))
          ])
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\cell\\row-picker.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var cellRowPicker = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
var script$3 = {
  extends: cellBase,
  methods: {
    cancelChange($event) {
      $event.target.value = this.value;
    }
  }
};

/* script */
            const __vue_script__$5 = script$3;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    class: ["text-editor", _vm.classes.input],
    style: _vm.styles.input,
    attrs: { type: "text" },
    domProps: { value: _vm.value },
    on: {
      keyup: [
        function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
          ) {
            return null
          }
          _vm.acceptChange(
            _vm.column.id,
            $event.target.value,
            _vm.value,
            $event.target
          );
        },
        function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "esc", 27, $event.key, "Escape")
          ) {
            return null
          }
          return _vm.cancelChange($event)
        }
      ],
      blur: _vm.cancelChange
    }
  })
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\cell\\text-editor.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var cellTextEditor = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
var script$4 = {
  extends: cellBase,
  methods: {
    cancelChange($event) {
      $event.target.value = this.value;
    }
  }
};

/* script */
            const __vue_script__$6 = script$4;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    class: ["number-editor", _vm.classes.input],
    style: _vm.styles.input,
    attrs: { type: "number" },
    domProps: { value: _vm.value },
    on: {
      keyup: [
        function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
          ) {
            return null
          }
          _vm.acceptChange(
            _vm.column.id,
            $event.target.value,
            _vm.value,
            $event.target
          );
        },
        function($event) {
          if (
            !("button" in $event) &&
            _vm._k($event.keyCode, "esc", 27, $event.key, "Escape")
          ) {
            return null
          }
          return _vm.cancelChange($event)
        }
      ],
      blur: _vm.cancelChange
    }
  })
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\cell\\number-editor.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var cellNumberEditor = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//

const component$2 = {
  props: {
    idProp: { type: String, required: false, default: "id" },
    pickedProp: { type: String, required: false, default: "picked" },
    withoutThead: { type: Boolean, required: false, default: false },
    columns: { type: Array, required: true },
    rows: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    classes: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    styles: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    group: { type: [String, Object], required: false }
  },
  computed: {
    /**
     * The result of function call flatten(this.columns).
     * It gather all columns leaf to return.
     */
    $_columnsLeaf() {
      return flatten$1(this.columns);
    },
    /** Polishing the `group` config to a standard Object format */
    $_group() {
      return typeof this.group === "string" ? { prop: this.group } : this.group;
    },
    /** Group the rows by the `group` prop config */
    $_groupedRows() {
      if (!this.$_group) return null;
      return groupRows(this.rows, this.$_group);
    },
    /** Collect all the selected row by the `pickedProp`'s boolean value */
    selection() {
      if (!this.rows) return [];
      else return this.rows.filter(r => r[this.pickedProp]);
    }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead,

    "st-cell-text": cellText,
    "st-cell-html": cellHtml,
    "st-cell-row-picker": cellRowPicker,
    "st-cell-text-editor": cellTextEditor,
    "st-cell-number-editor": cellNumberEditor
  },
  methods: {
    $_getCellComponent(column) {
      if (!column.cell) {
        // global cell
        return (
          (typeof this.cell === "object" ? this.cell.component : this.cell) ||
          "st-cell-text"
        );
      } else {
        // column cell
        return (
          (typeof column.cell === "object"
            ? column.cell.component
            : column.cell) || "st-cell-text"
        );
      }
    },
    reemitCellChangeEvent($event) {
      // console.log("in table: newValue=%s, oldValue=%s", $event.newValue, $event.oldValue);

      // reemit cell-change event
      this.$emit("cell-change", $event);
    },
    deleteSelection() {
      this.selection.forEach(r =>
        this.$delete(this.rows, this.rows.indexOf(r))
      );
    }
  },
  watch: {
    selection(newValue, oldValue) {
      this.$emit("selection-change", newValue, oldValue);
    }
  }
};

/* script */
            const __vue_script__$7 = component$2;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "table",
    { class: ["st-table", _vm.classes.table], style: _vm.styles.root },
    [
      _c("st-colgroup", { tag: "colgroup", attrs: { columns: _vm.columns } }),
      _vm._v(" "),
      !_vm.withoutThead
        ? _c("st-thead", {
            tag: "thead",
            attrs: {
              columns: _vm.columns,
              classes: _vm.classes.thead,
              styles: _vm.styles.thead
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "tbody",
        { class: _vm.classes.tbody, style: _vm.styles.tbody },
        [
          _vm._l(_vm.$_groupedRows, function(groupRow) {
            return _vm.group
              ? [
                  _c(
                    "tr",
                    {
                      key: groupRow.rowIndex,
                      class: ["st-group-row", _vm.classes.groupRow],
                      style: _vm.styles.groupRow
                    },
                    [
                      _c(
                        "td",
                        {
                          class: ["st-group-cell", _vm.classes.groupCell],
                          style: _vm.styles.groupCell,
                          attrs: { colspan: _vm.$_columnsLeaf.length }
                        },
                        [
                          _c(_vm.$_getCellComponent(_vm.$_group), {
                            tag: "component",
                            attrs: {
                              "column-index": 0,
                              column: { id: "id", cell: _vm.$_group.cell },
                              "row-index": groupRow.rowIndex,
                              row: groupRow
                            },
                            on: { "cell-change": _vm.reemitCellChangeEvent }
                          })
                        ],
                        1
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm._l(groupRow.rows, function(row, rowIndex) {
                    return _c(
                      "tr",
                      {
                        key: groupRow.rowIndex + rowIndex + 1,
                        class: ["st-row", _vm.classes.row],
                        style: _vm.styles.row
                      },
                      _vm._l(_vm.$_columnsLeaf, function(column, columnIndex) {
                        return _c(
                          "td",
                          {
                            key: column.id,
                            class: ["st-cell", _vm.classes.cell],
                            style: _vm.styles.cell,
                            on: {
                              click: function($event) {
                                $event.stopPropagation();
                                _vm.$emit("cell-click", {
                                  rowIndex: rowIndex,
                                  row: row,
                                  columnIndex: columnIndex,
                                  column: column,
                                  row: row,
                                  column: column,
                                  target: $event.target
                                });
                              }
                            }
                          },
                          [
                            _c(_vm.$_getCellComponent(column), {
                              tag: "component",
                              attrs: {
                                "column-index": columnIndex,
                                column: column,
                                "row-index": groupRow.rowIndex + rowIndex + 1,
                                row: row,
                                "group-row": groupRow
                              },
                              on: { "cell-change": _vm.reemitCellChangeEvent }
                            })
                          ],
                          1
                        )
                      })
                    )
                  })
                ]
              : _vm._e()
          }),
          _vm._v(" "),
          !_vm.group
            ? _vm._l(_vm.rows, function(row, rowIndex) {
                return _c(
                  "tr",
                  {
                    key: row[_vm.idProp] || rowIndex,
                    class: ["st-row", _vm.classes.row],
                    style: _vm.styles.row
                  },
                  _vm._l(_vm.$_columnsLeaf, function(column, columnIndex) {
                    return _c(
                      "td",
                      {
                        key: column.id,
                        class: ["st-cell", _vm.classes.cell],
                        style: _vm.styles.cell,
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                            _vm.$emit("cell-click", {
                              rowIndex: rowIndex,
                              row: row,
                              columnIndex: columnIndex,
                              column: column,
                              row: row,
                              column: column,
                              target: $event.target
                            });
                          }
                        }
                      },
                      [
                        _c(_vm.$_getCellComponent(column), {
                          tag: "component",
                          attrs: {
                            "column-index": columnIndex,
                            column: column,
                            "row-index": rowIndex,
                            row: row
                          },
                          on: { "cell-change": _vm.reemitCellChangeEvent }
                        })
                      ],
                      1
                    )
                  })
                )
              })
            : _vm._e()
        ],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\table.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var table = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

export default table;
