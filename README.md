# Vue Component simter-vue-table

A [Vue] component used to generate HTML \<[table]\> element. 

[Demo](https://simter.github.io/simter-vue-table).

Options:

| Name                             | Description
|----------------------------------|--------------------
| columns                          | Define table columns
| &nbsp;&nbsp;&nbsp;&nbsp;id       | The column's id, it's the key in the `rows` item
| &nbsp;&nbsp;&nbsp;&nbsp;label    | The column's visible text
| &nbsp;&nbsp;&nbsp;&nbsp;width    | The column's width
| &nbsp;&nbsp;&nbsp;&nbsp;children | Define how to group columns. The `id` and `width` will be ignored if define this property
| rows                             | The table's row data
| classes                          | Define component class
| &nbsp;&nbsp;&nbsp;&nbsp;thead    | thead sub-component classes, follow [simter-vue-thead] `classes`  prop
| &nbsp;&nbsp;&nbsp;&nbsp;table    | table class, follow [Vue Class Bindings]
| &nbsp;&nbsp;&nbsp;&nbsp;tbody    | tbody class, follow [Vue Class Bindings]
| &nbsp;&nbsp;&nbsp;&nbsp;tr       | tbody/tr class, follow [Vue Class Bindings]
| &nbsp;&nbsp;&nbsp;&nbsp;td       | tbody/tr/td class, follow [Vue Class Bindings]
| styles                           | Define component style
| &nbsp;&nbsp;&nbsp;&nbsp;thead    | thead sub-component styles, follow [simter-vue-thead] `styles`  prop
| &nbsp;&nbsp;&nbsp;&nbsp;table    | table style, follow [Vue Style Bindings]
| &nbsp;&nbsp;&nbsp;&nbsp;tbody    | tbody style, follow [Vue Style Bindings]
| &nbsp;&nbsp;&nbsp;&nbsp;tr       | tbody/tr style, follow [Vue Style Bindings]
| &nbsp;&nbsp;&nbsp;&nbsp;td       | tbody/tr/td style, follow [Vue Style Bindings]

[simter-vue-thead]: https://github.com/simter/simter-vue-thead
[Vue Class Bindings]: https://vuejs.org/v2/guide/class-and-style.html
[Vue Style Bindings]: https://vuejs.org/v2/guide/class-and-style.html


## Develop

```
yarn install  // or npm install
npm run dev
```

Use [parcel] to run the development debug.

## Build

```
npm run build
```

Use [rollup] package the component to `dist` directory.

## Usage

## Example 1 : Simple Columns

Js:

```js
import table from 'simter-vue-table'

new Vue({
  el: "#sample",
  data: {
    columns: [
      { id: "key1", label: "Column1", width: "61px" },
      { id: "key2", label: "Column2", width: "62px" },
      { id: "key3", label: "Column3", width: "63px" }
    ],
    rows: [
      { key1: "v1-1", key2: "v2-1", key3: "v3-1" },
      { key1: "v1-2", key2: "v2-2", key3: "v3-2" },
      { key1: "v1-3", key2: "v2-3", key3: "v3-3" }
    ]
  },
  components: {
    "st-table": table
  }
})
```

Html template:

```html
<st-table id="#sample" :columns="columns" :rows="rows"></st-table>
```

Generated html:

```html
<!--
| Column1 | Column2 | Column3 |
| v1-1    | v2-1    | v3-1    |
| v1-2    | v2-2    | v3-2    |
| v1-3    | v2-3    | v3-3    |
-->
<table>
  <colgroup>
    <col style="width: 61px">
    <col style="width: 62px">
    <col style="width: 63px">
  </colgroup>
  <thead>
    <tr><th>Column1</th><th>Column2</th><th>Column3</th></tr>
  </thead>
  <tbody>
    <tr><td>v1-1</td><td>v2-1</td><td>v3-1</td></tr>
    <tr><td>v1-2</td><td>v2-2</td><td>v3-2</td></tr>
    <tr><td>v1-3</td><td>v2-3</td><td>v3-3</td></tr>
  </tbody>
</table>
```

## Example 2 : Group Columns

Use `children` key to define the group.

Js:

```js
import table from 'simter-vue-table'

new Vue({
  el: "#sample",
  data: {
    columns: [
      { id: "key1", label: "Column1", width: "61px" },
      {
        label: "Column2",
        children: [
          { id: "key21", label: "Column21", width: "62px" },
          { id: "key22", label: "Column22", width: "63px" }
        ]
      }
    ],
    rows: [
      { key1: "v1-1", key21: "v2-1-1", key22: "v2-2-1" },
      { key1: "v1-2", key21: "v2-1-2", key22: "v2-2-2" },
      { key1: "v1-3", key21: "v2-1-3", key22: "v2-2-3" }
    ]
  },
  components: {
    "st-table": table
  }
})
```

Html template:

```html
<st-table id="#sample" :columns="columns" :rows="rows"></st-table>
```

Generated html:

```html
<!--
| Column1 |       Column2       |
|         | Column21 | Column22 |
| v1-1    | v21-1    | v22-1    |
| v1-2    | v21-2    | v22-2    |
| v1-3    | v21-3    | v22-3    |
--> 
<table>
  <colgroup>
    <col style="width: 61px">
    <col style="width: 62px">
    <col style="width: 63px">
  </colgroup>
  <thead>
    <tr>
      <th rowspan="2">Column1</th>
      <th colspan="2">Column2</th>
    </tr>
    <tr>
      <th>Column21</th>
      <th>Column22</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>v1-1</td><td>v21-1</td><td>v22-1</td></tr>
    <tr><td>v1-2</td><td>v21-2</td><td>v22-2</td></tr>
    <tr><td>v1-3</td><td>v21-3</td><td>v22-3</td></tr>
  </tbody>
</table>
```

### Example 3 : Complex Group Columns

Use `children` key to define any level nested group columns.

Js:

```js
import table from 'simter-vue-table'

new Vue({
  el: "#sample",
  data: {
    columns: [
      { id: "key1", label: "Column1", width: "61px" },
      {
        label: "Column2",
        children: [
          { id: "key21", label: "Column21", width: "62px" },
          { 
            label: "Column22",
            children: [
              { id: "key221", label: "Column221", width: "63px" },
              { id: "key222", label: "Column222", width: "64px" }
            ] 
          }
        ]
      }
    ],
    rows: [
      { key1: "v1-1", key21: "v21-1", key221: "v221-1", key222: "v222-1" },
      { key1: "v1-2", key21: "v21-2", key221: "v221-2", key222: "v222-2" },
      { key1: "v1-3", key21: "v21-3", key221: "v221-3", key222: "v222-3" }
    ]
  },
  components: {
    "st-table": table
  }
})
```

Html template:

```html
<st-table id="#sample" :columns="columns" :rows="rows"></st-table>
```

Generated html:

```html
<!--
| Column1 |              Column2             |
|         | Column21 |       Column22        |
|         |          | Column221 | Column222 |
| v1-1    | v21-1    | v221-1    | v222-1    |
| v1-2    | v21-2    | v221-2    | v222-2    |
| v1-3    | v21-3    | v221-3    | v222-3    |
--> 
<table>
  <colgroup>
    <col style="width: 61px">
    <col style="width: 62px">
    <col style="width: 63px">
    <col style="width: 64px">
  </colgroup>
  <thead>
    <tr>
      <th rowspan="3">Column1</th>
      <th colspan="3">Column2</th>
    </tr>
    <tr>
      <th rowspan="2">Column21</th>
      <th colspan="2">Column22</th>
    </tr>
    <tr>
      <th>Column221</th>
      <th>Column222</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>v1-1</td><td>v21-1</td><td>v221-1</td><td>v222-1</td></tr>
    <tr><td>v1-2</td><td>v21-2</td><td>v221-2</td><td>v222-2</td></tr>
    <tr><td>v1-3</td><td>v21-3</td><td>v221-3</td><td>v222-3</td></tr>
  </tbody>
</table>
```

[rollup]: https://rollupjs.org
[parcel]: https://parceljs.org
[yarn]: https://yarnpkg.com
[Vue]: https://vuejs.org
[table]: https://developer.mozilla.org/docs/Web/HTML/Element/table