import { describe, beforeAll, test, expect } from 'vitest'
import Unusual from './index'

const SEEDS = {
  ONE: 'one',
  TWO: 2222,
}
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const alphaObj = []
  .concat(alphabet)
  .map((c, i) => [c, i])
  .reduce((agg, [c, i]) => Object.assign({}, agg, { [c]: i }))

function testWithSeed([seed, seed2]) {
  describe('Unusual', () => {
    let M1
    let M2
    let O1
    beforeAll(() => {
      M1 = new Unusual(seed)
      M2 = new Unusual(seed)
      O1 = new Unusual(seed2)
    })
    test('integer', () => {
      const range = { min: -500, max: 500 }
      const x = M1.integer(range)
      const y = M2.integer(range)
      expect(x).toEqual(y)
      expect(x).toMatchSnapshot()
      const z = M1.integer(range)
      expect(x).not.toEqual(z)
    })
    test('pick', () => {
      const x = M1.pick(alphabet)
      const y = M2.pick(alphabet)
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })
    test('pickKey', () => {
      const x = M1.pickKey(alphaObj)
      const y = O1.pickKey(alphaObj)
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })
    test('pickValue', () => {
      const x = M1.pickValue(alphaObj)
      const y = M2.pickValue(alphaObj)
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })
    test('random', () => {
      const x = M1.random()
      const y = M2.random()
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })
    test('floor', () => {
      const x = M1.floor(100)
      const y = M2.floor(100)
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })
    test('floorMin', () => {
      const x = M1.floorMin(1, 100)
      const y = M2.floorMin(1, 100)
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })

    test('shuffle', () => {
      const x = M1.shuffle(alphabet)
      const y = M1.shuffle(alphabet)
      expect(x).not.toEqual(y)
      expect(x).toMatchSnapshot()
      expect(y).toMatchSnapshot()
    })
  })
}

testWithSeed([SEEDS.ONE, SEEDS.TWO])
