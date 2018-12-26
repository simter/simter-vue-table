/*!
* simter-vue-table v0.7.1
* https://github.com/simter/simter-vue-table.git 
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['simter-vue-table'] = {})));
}(this, (function (exports) { 'use strict';

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
  * simter-vue-thead v0.4.2
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
            class: _vm.$_classes.row,
            style: _vm.$_styles.row
          },
          _vm._l(row, function(cell, cellIndex) {
            return _c(
              "th",
              {
                key: "cell-" + cellIndex,
                class: [_vm.$_classes.cell, cell.headerClass],
                style: [_vm.$_styles.cell, cell.headerStyle],
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
  function group (rows, group) {
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
      /**
       * The cell's id. 
       * Mostly use to record column.id for write back new value to origin row's data.
       */
      id: { type: [Number, String], required: false },
      /** The cell's index */
      cellIndex: { type: Number, required: true },
      /** cell backend value */
      value: { required: true },
      /** 
       * The belong row of this cell.
       * row: {value, rowIndex, index, group}
       * 1. row.group - {value, rowIndex, index}, the upper
       * 2. row.value - the origin row data
       * 3. row.rowIndex - the rowIndex in the table
       * 4. row.index - the array index in the origin rows or row.children
       * 
       * If the row has no upper belong group-row, there will be no group property.
       */
      row: { type: Object, required: true },

      // control each descendant dom element class
      classes: { type: Object, required: false, default() { return {} } },

      // control each descendant dom element style
      styles: { type: Object, required: false, default() { return {} } },

      // a render function to convert cell's value to a visable label
      render: { type: Function, required: false },

      // wherther to mutate the origin row's value if this is a editable cell
      mutate: { type: Boolean, required: false, default: false }
    },
    computed: {
      /** cell frontend content, text or html */
      label() {
        return this.render
          // render(value, row)
          // can get more component instance data from `this`
          ? this.render.call(this, this.value, this.row.value)
          // origin value
          : this.value;
      },
      /** 
       * zero base global RC string, such as '[1, 3]'.
       * Not include picker column.
       */
      rc() {
        return `[${this.row.rowIndex}, ${this.cellIndex}]`;
      }
    },
    methods: {
      /** Accept the cell value change and emit change event */
      acceptChange(mutate, newValue, oldValue, target) {
        if (newValue == oldValue) return;
        // console.log("acceptChange %s: id=%s, mutate=%s, newValu=%s, oldValue=%s", this.rc, this.id, mutate, newValue, oldValue);

        // update the origin row data
        if (mutate && this.id) {
          //console.log("mutate the origin row data for '%s'", this.id)
          this.$set(this.row.value, this.id, newValue);
        }

        // emit change event
        const data = {
          newValue, oldValue,
          cellIndex: this.cellIndex,
          row: this.row
        };
        if (this.id) data.id = this.id;
        if (mutate) data.mutate = mutate;
        this.$emit("change", data);
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
    return _c("span", [_vm._v(_vm._s(_vm.label))])
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
    return _c("div", { domProps: { innerHTML: _vm._s(_vm.label) } })
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
    props: {
      isGroupPicker: { type: Boolean, required: false, default: false },
      showNumber: { type: Boolean, required: false, default: true },
      showPicker: { type: Boolean, required: false, default: true }
    },
    data() {
      return { picked: false };
    },
    created(){
      if (this.isGroupPicker && this.id) {
        this.$watch("picked", value => {
          this.row.value[this.id] = value;
          this.$emit("pick", {picked: value, row: this.row});
        });
        this.$watch(`row.value.${this.id}`, value => {
          this.row.children && this.row.children.length === 0 && this.picked !== value && (this.picked = value);
        });
        this.row.children && this.row.children.length === 0 && (this.picked = this.row.value[this.id]);
      } else if (this.isGroupPicker && !this.id) {
        this.$watch("picked", value => {
          this.$emit("pick", {picked: value, row: this.row});
        });
      } else if (this.id) {
        this.$watch("picked", value => {
          this.row.value[this.id] = value;
          this.changeChildPicked(value);
          this.$emit("pick", {picked: value, row: this.row});
        });
        this.$watch(`row.value.${this.id}`, value => {
          this.picked !== value && (this.picked = value);
        });
        this.picked = this.row.value[this.id];
      } else {
        this.$watch("picked", value => {
          this.changeChildPicked(value);
          this.$emit("pick", {picked: value, row: this.row});
        });
      }
    },
    methods: {
      changeChildPicked(value){
        if (this.row.group) {
          // unpick group row's picker if it is picked
          let groupRowPicker = this.$parent.$refs.groupRowPicker
            .filter(t => t.row.rowIndex === this.row.group.rowIndex);
          if (!value) {
            groupRowPicker.forEach(t => t.picked && (t.picked = false));
          } else {
            // picked group if all children of the group are picked
            if (
              this.$parent.$refs.rowPicker
                .filter(
                  t => t.row.group && t.row.group.rowIndex === this.row.group.rowIndex
                )
                .every(t => t.picked)
            ) groupRowPicker.forEach(t => !t.picked && (t.picked = true));
          }
        }
      },
      pickedGroupEvent() {
        // pick all the children row
        this.$parent.$refs.rowPicker
          .filter(t => t.row.group && t.row.group.rowIndex === this.row.rowIndex)
          .forEach(t => {
            if (t.picked !== this.picked) t.picked = this.picked;
          });
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
      {
        class: ["row-picker", _vm.classes.container],
        style: _vm.styles.container
      },
      [
        _vm.showPicker && this.isGroupPicker
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.picked,
                  expression: "picked"
                }
              ],
              class: _vm.classes.picker,
              style: _vm.styles.picker,
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.picked)
                  ? _vm._i(_vm.picked, null) > -1
                  : _vm.picked
              },
              on: {
                change: [
                  function($event) {
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
                          (_vm.picked = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.picked = $$c;
                    }
                  },
                  function($event) {
                    $event.stopPropagation();
                    return _vm.pickedGroupEvent($event)
                  }
                ]
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showPicker && !this.isGroupPicker
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.picked,
                  expression: "picked"
                }
              ],
              class: _vm.classes.picker,
              style: _vm.styles.picker,
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
                        (_vm.picked = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)));
                    }
                  } else {
                    _vm.picked = $$c;
                  }
                }
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.showNumber
          ? _c("span", { class: _vm.classes.number, style: _vm.styles.number }, [
              _vm._v(
                _vm._s(
                  (_vm.row.group ? _vm.row.group.index + 1 + "-" : "") +
                    (_vm.row.index + 1)
                )
              )
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
  var script$3 = { extends: cellBase };

  /* script */
              const __vue_script__$5 = script$3;
              
  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("span", [_vm._v(_vm._s(_vm.rowIndex + 1))])
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
      component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-table\\src\\cell\\row-number.vue";

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
    

    
    var cellRowNumber = __vue_normalize__$5(
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
    data() {
      return { text: null };
    },
    created() {
      // init the text value
      this.text = this.value;
    },
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
      class: ["text-editor", _vm.classes.text],
      style: _vm.styles.text,
      attrs: { type: "text" },
      domProps: { value: _vm.text },
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
              _vm.mutate,
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
    

    
    var cellTextEditor = __vue_normalize__$6(
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
  var script$5 = {
    extends: cellBase,
    data() {
      return { num: null };
    },
    created() {
      // init the text value
      this.num = this.value;
    },
    methods: {
      cancelChange($event) {
        $event.target.value = this.value;
      }
    }
  };

  /* script */
              const __vue_script__$7 = script$5;
              
  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("input", {
      class: ["number-editor", _vm.classes.number],
      style: _vm.styles.number,
      attrs: { type: "number" },
      domProps: { value: _vm.num },
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
              _vm.mutate,
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
    

    
    var cellNumberEditor = __vue_normalize__$7(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      undefined,
      undefined
    );

  //

  const component$2 = {
    props: {
      // predicate whether to generate the thead element
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
      group: { type: [String, Object], required: false },
      /**
       * Set 'picker.id' so that you can control the row picked through row data.
       * Control the group row picked when the group row has children row,
       *   you should indirectly through children row data rather than directly through group row data.
       */
      picker: { type: [Boolean, String, Object], required: false, default: false },
      id: { type: String, required: false }
    },
    data() {
      return { rowsExt: [], selection: [] };
    },
    created() {
      this.generateRowsHelper();
    },
    computed: {
      /**
       * The result of function call flatten(this.columns).
       * It gather all columns leaf to return.
       */
      $_flattenColumns() {
        return flatten$1(this.columns);
      },
      /** The header columns */
      $_headerColumns() {
        if (this.$_picker)
          return [
            {
              label: this.$_picker.label || " ",
              width: this.$_picker.width
            }
          ].concat(this.columns);
        else return this.columns;
      },
      /** Polishing the `picker` config to a standard Object format */
      $_picker() {
        return typeof this.picker === "string"
          ? { component: this.picker }
          : this.picker === true
            ? { component: "st-cell-row-picker" }
            : this.picker;
      },
      /** Polishing the `group` config to a standard Object format */
      $_group() {
        if (this.group == null) return { predicate: false };
        else if (typeof this.group === "string")
          return { id: this.group, predicate: true, indent: true };
        else if (
          typeof this.group === "function" ||
          typeof this.group === "boolean"
        )
          return { id: "group", predicate: this.group, indent: true };
        else return this.group;
      },
      /** Filter all cell event listeners by prefix 'cell-' */
      $_cellEventListeners() {
        const cl = {};
        Object.keys(this.$listeners)
          .filter(key => key.startsWith("cell-"))
          .forEach(key => {
            cl[key.substr(5)] = this.$listeners[key];
          });
        //console.log("cellEventListeners=%s", Object.keys(cl).join(", "));
        return cl;
      },
      /** Filter all row event listeners by prefix 'row-' */
      $_rowEventListeners() {
        const cl = {};
        Object.keys(this.$listeners)
          .filter(key => key.startsWith("row-"))
          .forEach(key => {
            cl[key.substr(4)] = this.$listeners[key];
          });
        //console.log("rowEventListeners=%o", cl);
        return cl;
      }
    },
    components: {
      "st-colgroup": colgroup,
      "st-thead": thead,

      "st-cell-text": cellText,
      "st-cell-html": cellHtml,
      "st-cell-row-picker": cellRowPicker,
      "st-cell-row-number": cellRowNumber,
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
      /** Predicate whether this row is a group row */
      $_isGroupRow(row) {
        if (typeof this.$_group.predicate === "function")
          return this.$_group.predicate.call(this, row);
        else if (typeof this.$_group.predicate === "boolean")
          return this.$_group.predicate;
        else return row(this.$_group.predicate);
      },
      $_rowPickEvent($event) {
        if ($event.picked) this.selection.push($event.row);
        else {
          const index = this.selection.map(t => t.value).indexOf($event.row.value);
          if (index > -1) this.selection.splice(index, 1);
        }
      },
      deleteSelection(keepGroup) {
        let selection = this.selection.map(t => t.value);

        // When adding rows, the index recorded when the row is selected may be wrong
        // Tiling the two-layer structure and reverse it
        let rows = this.rows.reduce((array, firstLayer, firstIndex) => {
          array.push({firstIndex: firstIndex, secondIndex: -1, value: firstLayer});
          if (firstLayer.children) {
            return array.concat(firstLayer.children.map((it, index) => {
              return {firstIndex: firstIndex, secondIndex: index, value: it}
            }))
          } else {
            return array
          }
        }, []).reverse();

        // delete selection row for this rows
        rows.forEach(r => {
          if (selection.indexOf(r.value) !== -1) {
            if (r.secondIndex === -1) {
              if (!keepGroup || !r.value.children) this.$delete(this.rows, r.firstIndex);
            } else {
              this.$delete(this.rows[r.firstIndex].children, r.secondIndex);
            }
          }
        });
        this.selection = [];
      },
      generateRowsHelper() {
        // generate rows helper to save some specific data.
        // It has a same length with rows
        // [{value, index, rowIndex, children}, ...]
        const helper = [];
        let nextRowIndex = 0;
        this.rows.forEach((row, i) => {
          const _row = {
            value: row,
            index: i,
            rowIndex: nextRowIndex++,
            isGroupRow: this.$_isGroupRow(row)
          };
          helper.push(_row);
          if (_row.isGroupRow) {
            _row.children = [];
            row.children.forEach((crow, j) => {
              const _crow = {
                value: crow,
                index: j,
                rowIndex: nextRowIndex++,
                group: _row
              };
              _row.children.push(_crow);
            });
          }
        });
        this.rowsExt = helper;
      }
    },
    watch: {
      rows: {
        deep: true,
        handler() {
          //console.log("st-table : rows change");
          this.generateRowsHelper();
        }
      },
      group: {
        deep: true,
        handler() {
          //console.log("st-table : group change");
          this.generateRowsHelper();
        }
      },
      selection(value) {
        // 1. first param is the origin leaf row data.
        // 2. second param is [{value, rowIndex, index, group}, ...], value is the origin leaf row data, all defined in cellBase.
        if ("selection-change" in this.$listeners)
          this.$emit("selection-change", value.map(v => v.value), value);
      }
    }
  };

  /* script */
              const __vue_script__$8 = component$2;
              
  /* template */
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "table",
      { class: ["st-table", _vm.classes.table], style: _vm.styles.table },
      [
        _c("st-colgroup", {
          tag: "colgroup",
          attrs: { columns: _vm.$_headerColumns }
        }),
        _vm._v(" "),
        !_vm.withoutThead
          ? _c("st-thead", {
              tag: "thead",
              attrs: {
                columns: _vm.$_headerColumns,
                classes: {
                  thead: _vm.classes.thead,
                  row: _vm.classes.headerRow,
                  cell: _vm.classes.headerCell
                },
                styles: {
                  thead: _vm.styles.thead,
                  row: _vm.styles.headerRow,
                  cell: _vm.styles.headerCell
                }
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _c(
          "tbody",
          { class: _vm.classes.tbody, style: _vm.styles.tbody },
          [
            _vm._l(_vm.rowsExt, function(row) {
              return [
                row.isGroupRow
                  ? [
                      _c(
                        "tr",
                        {
                          key: _vm.id ? row.value[_vm.id] : row.rowIndex,
                          class: ["st-group-row", _vm.classes.groupRow],
                          style: _vm.styles.groupRow
                        },
                        [
                          _vm.$_picker
                            ? _c(
                                "td",
                                {
                                  class: [
                                    "st-group-cell st-row-picker",
                                    _vm.classes.groupCell
                                  ],
                                  style: _vm.styles.groupCell
                                },
                                [
                                  _c(
                                    _vm.$_picker.component,
                                    _vm._g(
                                      _vm._b(
                                        {
                                          ref: "groupRowPicker",
                                          refInFor: true,
                                          tag: "component",
                                          on: { pick: _vm.$_rowPickEvent }
                                        },
                                        "component",
                                        Object.assign(
                                          {
                                            cellIndex: 0,
                                            value: _vm.$_picker.id
                                              ? row.value[_vm.$_picker.id]
                                              : null,
                                            row: row,
                                            isGroupPicker: true
                                          },
                                          _vm.$_picker
                                        ),
                                        false
                                      ),
                                      _vm.$_rowEventListeners
                                    )
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "td",
                            {
                              class: ["st-group-cell", _vm.classes.groupCell],
                              style: _vm.styles.groupCell,
                              attrs: {
                                colspan:
                                  _vm.$_group.colspan ||
                                  _vm.$_flattenColumns.length
                              }
                            },
                            [
                              _c(
                                _vm.$_getCellComponent(_vm.$_group),
                                _vm._g(
                                  _vm._b(
                                    { tag: "component" },
                                    "component",
                                    Object.assign(
                                      {
                                        id: _vm.$_group.id,
                                        cellIndex: 0,
                                        value: row.value[_vm.$_group.id],
                                        row: row
                                      },
                                      _vm.$_group.cell
                                    ),
                                    false
                                  ),
                                  _vm.$_cellEventListeners
                                )
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm.$_group.colspan &&
                          _vm.$_flattenColumns.length - _vm.$_group.colspan > 0
                            ? _c("td", {
                                class: ["st-group-cell", _vm.classes.groupCell],
                                style: _vm.styles.groupCell,
                                attrs: {
                                  colspan:
                                    _vm.$_flattenColumns.length -
                                    _vm.$_group.colspan
                                }
                              })
                            : _vm._e()
                        ]
                      ),
                      _vm._v(" "),
                      _vm._l(row.children, function(crow) {
                        return _c(
                          "tr",
                          {
                            key: _vm.id
                              ? crow.value[_vm.id]
                              : crow.rowIndex + "-" + crow.rowIndex,
                            class: ["st-row", _vm.classes.row],
                            style: _vm.styles.row
                          },
                          [
                            _vm.$_picker
                              ? _c(
                                  "td",
                                  {
                                    class: [
                                      "st-cell st-row-picker",
                                      _vm.classes.cell
                                    ],
                                    style: _vm.styles.cell
                                  },
                                  [
                                    _c(
                                      _vm.$_picker.component,
                                      _vm._g(
                                        _vm._b(
                                          {
                                            ref: "rowPicker",
                                            refInFor: true,
                                            tag: "component",
                                            on: { pick: _vm.$_rowPickEvent }
                                          },
                                          "component",
                                          Object.assign(
                                            {
                                              cellIndex: 0,
                                              value: _vm.$_picker.id
                                                ? crow.value[_vm.$_picker.id]
                                                : null,
                                              row: crow
                                            },
                                            _vm.$_picker
                                          ),
                                          false
                                        ),
                                        _vm.$_rowEventListeners
                                      )
                                    )
                                  ],
                                  1
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(_vm.$_flattenColumns, function(
                              column,
                              columnIndex
                            ) {
                              return _c(
                                "td",
                                {
                                  key: column.id,
                                  class: [
                                    "st-cell",
                                    _vm.classes.cell,
                                    column.class,
                                    columnIndex === 0 &&
                                    _vm.$_group.indent !== false
                                      ? typeof _vm.$_group.indent === "string"
                                        ? _vm.$_group.indent
                                        : "st-indent"
                                      : null
                                  ],
                                  style: [_vm.styles.cell, column.style]
                                },
                                [
                                  _c(
                                    _vm.$_getCellComponent(column),
                                    _vm._g(
                                      _vm._b(
                                        { tag: "component" },
                                        "component",
                                        Object.assign(
                                          {
                                            id: column.id,
                                            cellIndex: columnIndex,
                                            value: crow.value[column.id],
                                            row: crow
                                          },
                                          column.cell
                                        ),
                                        false
                                      ),
                                      _vm.$_cellEventListeners
                                    )
                                  )
                                ],
                                1
                              )
                            })
                          ],
                          2
                        )
                      })
                    ]
                  : [
                      _c(
                        "tr",
                        {
                          key: _vm.id ? row.value[_vm.id] : row.rowIndex,
                          class: ["st-row", _vm.classes.row],
                          style: _vm.styles.row
                        },
                        [
                          _vm.$_picker
                            ? _c(
                                "td",
                                {
                                  class: [
                                    "st-cell st-row-picker",
                                    _vm.classes.cell
                                  ],
                                  style: _vm.styles.cell
                                },
                                [
                                  _c(
                                    _vm.$_picker.component,
                                    _vm._g(
                                      _vm._b(
                                        {
                                          ref: "rowPicker",
                                          refInFor: true,
                                          tag: "component",
                                          on: { pick: _vm.$_rowPickEvent }
                                        },
                                        "component",
                                        Object.assign(
                                          {
                                            cellIndex: 0,
                                            value: _vm.$_picker.id
                                              ? row.value[_vm.$_picker.id]
                                              : null,
                                            row: row
                                          },
                                          _vm.$_picker
                                        ),
                                        false
                                      ),
                                      _vm.$_rowEventListeners
                                    )
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.$_flattenColumns, function(
                            column,
                            columnIndex
                          ) {
                            return _c(
                              "td",
                              {
                                key: column.id,
                                class: [
                                  "st-cell",
                                  _vm.classes.cell,
                                  column.class
                                ],
                                style: [_vm.styles.cell, column.style]
                              },
                              [
                                _c(
                                  _vm.$_getCellComponent(column),
                                  _vm._g(
                                    _vm._b(
                                      { tag: "component" },
                                      "component",
                                      Object.assign(
                                        {
                                          id: column.id,
                                          cellIndex: columnIndex,
                                          value: row.value[column.id],
                                          row: row
                                        },
                                        column.cell
                                      ),
                                      false
                                    ),
                                    _vm.$_cellEventListeners
                                  )
                                )
                              ],
                              1
                            )
                          })
                        ],
                        2
                      )
                    ]
              ]
            })
          ],
          2
        )
      ]
    )
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = undefined;
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* component normalizer */
    function __vue_normalize__$8(
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
    

    
    var table = __vue_normalize__$8(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      undefined,
      undefined
    );

  exports.default = table;
  exports.cellBase = cellBase;
  exports.cellText = cellText;
  exports.cellHtml = cellHtml;
  exports.cellRowPicker = cellRowPicker;
  exports.cellRowNumber = cellRowNumber;
  exports.cellTextEditor = cellTextEditor;
  exports.cellNumberEditor = cellNumberEditor;
  exports.group = group;
  exports.stTableColgroup = colgroup;
  exports.stTableThead = thead;
  exports.flatten = flatten$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
