import test from 'ava'
import { flatten } from '../src/table.vue'

test('should be a function', t => {
  t.is(typeof flatten, "function")
})

test('no nested', t => {
  const columns = [
    { id: "key1", label: "X1", width: "1px" },
    { id: "key2", label: "X2", width: "2px" }
  ]
  const result = flatten(columns)
  t.deepEqual(result, columns)
})

test('nested 1', t => {
  const columns = [
    { id: "key1", label: "X1", width: "50px" },
    {
      label: "X2",
      children: [
        { id: "key21", label: "X21", width: "50px" },
        { id: "key22", label: "X22", width: "50px" }
      ]
    }]
  const result = flatten(columns)
  t.deepEqual(result, [
    { id: "key1", label: "X1", width: "50px" },
    { id: "key21", label: "X21", width: "50px" },
    { id: "key22", label: "X22", width: "50px" }
  ])
})

test('nested 2', t => {
  const columns = [
    { id: "key1", label: "X1", width: "50px" },
    {
      label: "X2",
      children: [
        { id: "key21", label: "X21", width: "50px" },
        {
          label: "X22",
          children: [
            { id: "key221", label: "X221", width: "50px" },
            { id: "key222", label: "X222", width: "50px" }
          ]
        }
      ]
    }]
  const result = flatten(columns)
  t.deepEqual(result, [
    { id: "key1", label: "X1", width: "50px" },
    { id: "key21", label: "X21", width: "50px" },
    { id: "key221", label: "X221", width: "50px" },
    { id: "key222", label: "X222", width: "50px" }
  ])
})