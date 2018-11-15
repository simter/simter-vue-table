/**
 * The table's global config with jquery-ui.
 */
import { deepAssign } from "../utils/smart-assign";

// table's classes config
const classes = {
  table: ["ui-widget-content"],
  headerRow: "st-row",
  headerCell: "st-cell"
}
const inherit = "border-color:inherit;border-style:inherit;border-width:inherit";
const styles = {
  thead: {
    thead: inherit,
    tr: inherit,
    th: inherit
  },
  row: inherit,
  groupRow: inherit
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