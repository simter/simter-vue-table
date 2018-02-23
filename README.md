# simter-vue-table component

Use to generate table content.
Demo or document is [here](https://simter.github.io/simter-vue-table).

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
      { id: "key1", label: "Column1", width: "100px" },
      { id: "key2", label: "Column2", width: "120px" },
      { id: "key3", label: "Column3", width: "150px" }
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
<st-table id="#sample" :columns="columns" :rows="rows" border="1"></st-table>
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
    <col style="width: 100px">
    <col style="width: 120px">
    <col style="width: 150px">
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

Js:

```js
import table from 'simter-vue-table'

new Vue({
  el: "#sample",
  data: {
    columns: [
      { id: "key1", label: "Column1", width: "100px" },
      {
        label: "Column2",
        children: [
          { id: "key21", label: "Column21", width: "120px" },
          { id: "key22", label: "Column22", width: "130px" }
        ]
      },
      { id: "key3", label: "Column3", width: "150px" }
    ],
    rows: [
      { key1: "v1-1", key21: "v2-1-1", key22: "v2-2-1", key3: "v3-1" },
      { key1: "v1-2", key21: "v2-1-2", key22: "v2-2-2", key3: "v3-2" },
      { key1: "v1-3", key21: "v2-1-3", key22: "v2-2-3", key3: "v3-3" }
    ]
  },
  components: {
    "st-table": table
  }
})
```

Html template:

```html
<st-table id="#sample" :columns="columns" :rows="rows" border="1"></st-table>
```

Generated html:

```html
<!--
| Column1 |       Column2       | Column3 |
|         | Column21 | Column22 |         |
| v1-1    | v2-1-1   | v2-2-1   | v3-1    |
| v1-2    | v2-1-2   | v2-2-2   | v3-2    |
| v1-3    | v2-1-3   | v2-2-3   | v3-3    |
--> 
<table>
  <colgroup>
    <col style="width: 100px">
    <col style="width: 120px">
    <col style="width: 130px">
    <col style="width: 150px">
  </colgroup>
  <thead>
    <tr>
      <th rowspan="2">Column1</th>
      <th colspan="2">Column2</th>
      <th rowspan="2">Column3</th>
    </tr>
    <tr>
      <th>Column221</th>
      <th>Column222</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>v1-1</td><td>v2-1-1</td><td>v2-2-1</td><td>v3-1</td></tr>
    <tr><td>v1-2</td><td>v2-1-2</td><td>v2-2-2</td><td>v3-2</td></tr>
    <tr><td>v1-3</td><td>v2-1-3</td><td>v2-2-3</td><td>v3-3</td></tr>
  </tbody>
</table>
```

[rollup]: https://rollupjs.org
[parcel]: https://parceljs.org
[yarn]: https://yarnpkg.com