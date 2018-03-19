<template>
<form :class="'ui form'" style="padding:1em">
  <div class="title">
    <h2>
      <a href="https://semantic-ui.com/collections/table.html">Semantic UI 2.x</a>
      <span style="font-size: 50%">Integration</span>
      <div class="compact" style="float: right; font-size: 60%">Theme :
        <select style="padding: 0.2em; display: inline-block; width: auto" v-model="ui.theme" @change="changeTheme">
          <option v-for="theme in ui.themes" v-bind:key="theme.id">{{ theme.id }}</option>
        </select>
      </div>
    </h2>
  </div>
  <div class="template">
    <st-table :columns="columns" :rows="rows" :classes="classes"></st-table>
  </div>
  <div class="grouped fields">
    <label>Options :</label>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" v-model="ui.inverted">
        <label>Inverted</label>
      </div>
    </div>
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
        selectableCell: false,

        theme: "Cyborg",
        themes: [
          {id: "Default", href: "https://cdn.jsdelivr.net/npm/semantic-ui@2.3.0/dist/semantic.min.css"},
          {id: "Darkly", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.darkly.min.css"},
          {id: "Cyborg", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.cyborg.min.css"},
          {id: "Slate", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.slate.min.css"},
          {id: "Solar", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.solar.min.css"},
          {id: "Superhero", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.superhero.min.css"},

          {id: "Cerulean", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.Cerulean.min.css"},
          {id: "Cosmo", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.Cosmo.min.css"},
          {id: "Flatly", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.flatly.min.css"},
          {id: "Journal", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.journal.min.css"},
          {id: "Lumen", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.lumen.min.css"},
          {id: "Paper", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.paper.min.css"},
          {id: "Readable", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.readable.min.css"},
          {id: "Sandstone", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.sandstone.min.css"},
          {id: "Simplex", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.simplex.min.css"},
          {id: "Spacelab", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.spacelab.min.css"},
          {id: "United", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.united.min.css"},
          {id: "Yeti", href: "https://cdn.jsdelivr.net/npm/semantic-ui-forest-themes@1.0.3/semantic.yeti.min.css"}
        ]
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
  },
  methods: {
    changeTheme(){
      const href = this.getThemeHrefById(this.ui.theme)
      //console.log("%s-%s", this.ui.theme, href)
      document.getElementById('theme').href = href
    },
    getThemeHrefById(themeId){
      for (const theme of this.ui.themes)
        if (theme.id === themeId) return theme.href
    }
  }
};
</script>