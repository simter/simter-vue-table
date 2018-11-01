/**
 * The table's global config with jquery-ui.
 */
import { deepAssign } from "../utils/smart-assign";

// table's classes config
const classes = {
  thead: {
    tr: "st-header ui-widget-content",
    th: "st-cell"
  },
  row: "st-row ui-widget-content",
  groupRow: "st-group-row ui-widget-content"
}

// inner cell component config
const cells = {
  'st-cell-text': {
    component: "st-cell-text"
  },
  'st-cell-html': {
    component: "st-cell-html"
  },
  'st-cell-row-picker': {
    component: "st-cell-row-picker",
    showContent: false,
    showRowNumber: false,
    classes: { input: "ui-widget-content" }
  },
  'st-cell-text-editor': {
    component: "st-cell-text-editor",
    classes: { input: "ui-widget-content" }
  },
  'st-cell-number-editor': {
    component: "st-cell-number-editor",
    classes: { input: "ui-widget-content" }
  }
}

const cell = function (key, specialConfig) {
  return deepAssign({}, cells[key] || { component: key }, specialConfig);
}

export { classes, cells, cell }