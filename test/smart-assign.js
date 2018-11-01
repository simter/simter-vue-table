import test from 'ava'
import Vue from 'vue'
import { deepAssign, merge } from '../src/utils/smart-assign'

test('deep assign to target', t => {
  const target = { k1: 'v1', k2: { k21: 'v21' } }
  const source = { k1: 'nv1', k2: { k22: 'v22' } }
  const actual = deepAssign(target, source)

  // verify
  t.is(actual, target)
  t.deepEqual(actual, { k1: 'nv1', k2: { k21: 'v21', k22: 'v22' } })
  t.deepEqual(source, { k1: 'nv1', k2: { k22: 'v22' } }, 'source should be changed')
})

test('deep assign to new object', t => {
  const source1 = { k1: 'v1', k2: { k21: 'v21' } }
  const source2 = { k1: 'nv1', k2: { k22: 'v22' } }
  const target = { }
  const actual = deepAssign(target, source1, source2)

  // verify
  t.is(actual, target)
  t.deepEqual(actual, { k1: 'nv1', k2: { k21: 'v21', k22: 'v22' } })
  t.deepEqual(source1, { k1: 'v1', k2: { k21: 'v21' } }, 'source1 should be changed')
  t.deepEqual(source2, { k1: 'nv1', k2: { k22: 'v22' } }, 'source2 should be changed')
})

test('merge without prop', t => {
  const target = { k1: 'v1', k2: 'v21' }
  const source = { k1: 'nv1', k2: { k22: 'v22' } }
  const actual = merge(target, source)

  // verify
  t.is(actual, target)
  t.deepEqual(actual, { k1: 'nv1', k2: { k22: 'v22' } })
  t.deepEqual(source, { k1: 'nv1', k2: { k22: 'v22' } }, 'source should be changed')
})


test('merge with prop', t => {
  const target = { k1: 'v1', k2: 'v21' }
  const source = { k1: 'nv1', k2: { k22: 'v22' } }
  const actual = merge(target, source, "k21")

  // verify
  t.is(actual, target)
  t.deepEqual(actual, { k1: 'nv1', k2: { k21: 'v21', k22: 'v22' } })
  t.deepEqual(source, { k1: 'nv1', k2: { k22: 'v22' } }, 'source should be changed')
})
