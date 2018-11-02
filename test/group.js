import test from 'ava'
import Vue from 'vue'
import group from '../src/utils/group'

test('group function', t => {
  const rows = [
    {g: 'b', id: 22}, 
    {g: 'a', id: 11}, 
    {g: 'b', id: 21}, 
    {id: 52}, 
    {id: 50}
  ]
  const expected = [
    {rowIndex: 0, id: 'b', rows: [{g: 'b', id: 22}, {g: 'b', id: 21}]},
    {rowIndex: 3, id: 'a', rows: [{g: 'a', id: 11}]},
    {rowIndex: 5, id: undefined, rows: [{id: 52}, {id: 50}]},
    {rowIndex: 8, id: 'c', rows: []},
    {rowIndex: 9, id: 'd', rows: []}
  ]
  const groupConfig = {prop: 'g', names: ['c', 'd']}
  const actual = group(rows, groupConfig)

  // verify
  t.is(actual.length, 5)
  t.deepEqual(actual, expected)
})