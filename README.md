# Vue Component simter-vue-table

A [Vue] component used to generate HTML \<[table]\> element. 

[Demo](https://simter.github.io/simter-vue-table).

Options:

| Name___________ | Require | ValueType  | Description
|---------------|---------|--------------|-------------
| columns       | true    | \[{}\]       | Define table columns
| ├ id          | false   | String       | The column's id, it's the key in the `rows` item
| ├ label       | true    | String       | The column's visible text
| ├ width       | false   | String       | The column's width, such as `'2em'`
| ├ children    | false   | \[{}\]       | The child group columns. `id` and `width` will be ignored if define this property
| ├ headerClass | false   | String       | This column's `thead/tr/th` element class, follow [Vue Class Bindings]
| ├ headerStyle | false   | String       | This column's `thead/tr/th` element style, follow [Vue Class Bindings]
| ├ class       | false   | String       | This column's `tbody/tr/td` element class, follow [Vue Class Bindings]
| ├ style       | false   | String       | This column's `tbody/tr/td` element style, follow [Vue Class Bindings]
| ├ cell        | false   | {}<br>String | Define cell customized, `String` type means setting `component` value
| │ ├ component | false   | String       | The cell component's name
| │ ├ classes   | false   | {}           | Define the cell's inner dom elements classes, keys is up to the component design
| │ ├ styles    | false   | {}           | Define the cell's inner dom elements styles, keys is up to the component design
| │ ├ ...custom | false   | custom       | The custom properties for all this column's cell component. It is up to the component design
| rows          | true    | \[{}\]       | The table's row data
| classes       | false   | {}           | Define inner dom elements global classes
| ├ headerRow   | false   | String       | thead/tr class, follow [Vue Class Bindings]
| ├ headerCell  | false   | String       | thead/tr/td class, follow [Vue Class Bindings]
| ├ row         | false   | String       | tbody/tr class, follow [Vue Class Bindings]
| ├ cell        | false   | String       | tbody/tr/td class, follow [Vue Class Bindings]
| ├ groupRow    | false   | String       | group tbody/tr class, follow [Vue Class Bindings]
| ├ groupCell   | false   | String       | group tbody/tr/td class, follow [Vue Class Bindings]
| ├ table       | false   | String       | table class, follow [Vue Class Bindings]
| ├ thead       | false   | String       | thead class, follow [Vue Class Bindings]
| ├ tbody       | false   | String       | tbody class, follow [Vue Class Bindings]
| styles        | false   | {}           | Define inner dom elements global styles, simular to `classes` prop
| group         | false   | {}<br>String<br>Boolean<br>Function | Define how to predicate a group row. <br>`String` type means setting `id` value with `predicate=true`. <br>`Boolean` or `Function` type means setting `predicate` value with `id='group'`.
| ├ id          | false   | String                   | The key in the row item to get the group cell value
| ├ predicate   | false   | String<br>Function       | Generate a bool value to predicate whether this row is a group row<br>- String: The row item's key that to get the  bool value<br>- Function: Call to get the bool value. It's first param is the current row data
| ├ indent      | false   | Boolean<br>String        | Predicate whether to indent children row or not. Default is true. <br>`String` type means setting a specific indent style, such as `padding-left:2em`
| ├ cell        | false   | {}<br>String             | The group cell component config, same as `columns[i].cell`
| ├ colspan     | false   | Number                   | The group cell's colspan attribute value. Default behavior is to merge all the column cell
| picker        | false   | {}<br>String<br>Boolean  | Define the picker column cell. <br>`String` type means setting `component` value. <br>`Boolean` type means whether to show a default picker cell column.
| ├ id          | false   | String                   | The key in the row item to get the picked value
| ├ component   | false   | String       | The cell component's name
| ├ classes     | false   | {}           | Define the picker cell's inner dom elements classes, keys is up to the component design
| ├ styles      | false   | {}           | Define the picker cell's inner dom elements styles, keys is up to the component design
| ├ ...custom   | false   | custom       | The custom properties for this picker cell component. It is up to the component design
| id            | false   | String       | The key in row item that use its value to unique table row identity

[simter-vue-thead]: https://github.com/simter/simter-vue-thead
[Vue Class Bindings]: https://vuejs.org/v2/guide/class-and-style.html
[Vue Style Bindings]: https://vuejs.org/v2/guide/class-and-style.html


## Develop

```
yarn install  // or npm install
yarn run dev  // or npm run dev
```

Use [parcel] to run the development debug.

## Build

```
yarn run build  // or npm run build
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