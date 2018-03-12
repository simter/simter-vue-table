<template>
<form :class="'ui form'" style="padding:1em">
  <div class="title">
    <h1><a href="https://semantic-ui.com/collections/table.html">Semantic UI 2.x</a>
    <div class="ui toggle checkbox" style="float:right">
      <input type="checkbox" v-model="ui.inverted">
      <label>Inverted</label>
    </div>
    </h1>
  </div>
  <div class="template">
    <st-table :columns="columns" :rows="rows" :classes="classes"></st-table>
  </div>
  <div class="grouped fields">
    <label>Options :</label>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.celledTable">
        <label>Celled (show inner vertical line)</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.selectableRow">
        <label>Selectable Row (row hoverable)</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.stripedRows">
        <label>Striped rows</label>
      </div>
    </div>
    <div class="field">
      <div class="inline fields">
        <label>Size : </label>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="size" v-model="ui.sizeClass" value="">
            <label>NoSet</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="size" v-model="ui.sizeClass" value="compact">
            <label>Compact</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="size" v-model="ui.sizeClass" value="small">
            <label>Small</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="size" v-model="ui.sizeClass" value="large">
            <label>Large</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" name="size" v-model="ui.sizeClass" value="padded">
            <label>Padded</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.singleLineTable">
        <label>Single line (cell content not wrap)</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.fixedTable">
        <label>Fixed (show ellipsis if with single line)</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.veryTable">
        <label>Add very class</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.basicTable">
        <label>Add basic class</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.collapsingTable">
        <label>Collapsing (auto width)</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.definitionTable">
        <label>Definition (emphasize first column)</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.structuredTable">
        <label>Structured</label>
      </div>
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.unstackableTable">
        <label>Unstackable (table content not responsively)</label>
      </div>
    </div>
    <!-- <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.selectableCell">
        <label>Selectable Cell (cell hoverable) - disabled</label>
      </div>
    </div> -->
  </div>
</form>
</template>

<script>
import table from "../../../src/table.vue";
export default {
  data() {
    return {
      ui: {
        inverted: false,
        tableHeader: "",
        celledTable: true,
        selectableRow: true,
        stripedRows: false,

        sizeClass: "",
        compactTable: false,
        paddedTable: false,
        smallTable: false,
        largeTable: false,

        singleLineTable: false,
        fixedTable: false,
        veryTable: false,
        basicTable: false,
        collapsingTable: false,
        definitionTable: false,
        structuredTable: false,
        unstackableTable: false,
        selectableCell: false
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
        { sn: 3, first: "Larry", last: "the Bird", handle: "@twitter" },
        { sn: 4, first: "Larry", last: "auto wrap the content?", handle: "@twitter" },
        { sn: 5, first: "Larry", last: "the Bird", handle: "@twitter" }
      ]
    };
  },
  components: {
    "st-table": table
  },
  computed: {
    classes() {
      const cs = {
        table: ["ui table"],
        thead: ""
      };

      cs.thead = this.ui.tableHeader;
      if (this.ui.inverted) cs.table.push("inverted");
      if (this.ui.celledTable) cs.table.push("celled");
      if (this.ui.selectableRow) cs.table.push("selectable");
      if (this.ui.stripedRows) cs.table.push("striped");
      
      if (this.ui.sizeClass) cs.table.push(this.ui.sizeClass);

      if (this.ui.singleLineTable) cs.table.push("single line");
      if (this.ui.fixedTable) cs.table.push("fixed");
      if (this.ui.veryTable) cs.table.push("very");
      if (this.ui.basicTable) cs.table.push("basic");
      if (this.ui.collapsingTable) cs.table.push("collapsing");
      if (this.ui.definitionTable) cs.table.push("definition");
      if (this.ui.structuredTable) cs.table.push("structured");
      if (this.ui.unstackableTable) cs.table.push("unstackable");
      //if (this.ui.selectableCell) cs.table.push("selectable");
      return cs;
    }
  }
};
</script>