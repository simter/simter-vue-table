(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('simter-vue-colgroup'), require('simter-vue-thead')) :
	typeof define === 'function' && define.amd ? define(['simter-vue-colgroup', 'simter-vue-thead'], factory) :
	(global['simter-vue-table'] = factory(global['simter-vue-colgroup'],global['simter-vue-thead']));
}(this, (function (colgroup,thead) { 'use strict';

colgroup = colgroup && colgroup.hasOwnProperty('default') ? colgroup['default'] : colgroup;
thead = thead && thead.hasOwnProperty('default') ? thead['default'] : thead;

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .st-table { border-collapse: collapse; table-layout: fixed; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();












var table = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"st-table"},[_c("st-colgroup",{tag:"colgroup",attrs:{"columns":_vm.columns}}),_vm._v(" "),_c("st-thead",{tag:"thead",attrs:{"columns":_vm.columns}}),_vm._v(" "),_c('tbody',_vm._l((_vm.rows),function(row,index){return _c('tr',{key:row.id || index},_vm._l((_vm.columns),function(column){return _c('td',{key:column.id},[_vm._v(_vm._s(row[column.id]))])}))}))])},staticRenderFns: [],
  replace: true,
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: false, default: [] }
  },
  components: {
    "st-colgroup": colgroup,
    "st-thead": thead
  }
};

return table;

})));
