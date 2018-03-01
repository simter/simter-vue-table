import test from 'ava'
import Vue from 'vue'
import table from '../src/table.vue'

function createComponentInstance(propsData) {
  const Constructor = Vue.extend(table)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm
}

test('simple table', t => {
  const columns = [
    { id: "id", label: "X1", width: "51px" },
    { id: "code", label: "X2", width: "52px" }
  ]
  const rows = [
    { id: 1, code: "code1" },
    { id: 2, code: "code2" }
  ]
  const vm = createComponentInstance({ columns, rows })

  // verify container
  t.is(vm.$el.tagName, "TABLE")
  const children = vm.$el.children;
  t.is(children.length, 3)

  // verify colgroup
  t.is(children[0].tagName, "COLGROUP")

  // verify thead
  t.is(children[1].tagName, "THEAD")

  // verify tbody
  t.is(children[2].tagName, "TBODY")
})