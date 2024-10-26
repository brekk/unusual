import { test, describe, beforeAll, expect } from 'vitest'
import Twister from './fast-twister'

const SEED = {
  ONE: 100,
  TWO: 200,
}

function testWithSeed(seed) {
  describe(`Twister with seed: ${seed}`, () => {
    let TWIST
    beforeAll(() => {
      TWIST = new Twister(seed)
    })

    test('integer', () => {
      const x = TWIST.randomNumber()
      expect(x).toMatchSnapshot()
    })
    test('31 bit', () => {
      const x = TWIST.random31Bit()
      expect(x).toMatchSnapshot()
    })
    test('inclusive', () => {
      const x = TWIST.randomInclusive()
      expect(x).toMatchSnapshot()
    })
    test('random', () => {
      const x = TWIST.random()
      expect(x).toMatchSnapshot()
    })
    test('exclusive', () => {
      const x = TWIST.randomExclusive()
      expect(x).toMatchSnapshot()
    })
    test('long', () => {
      const x = TWIST.random53Bit()
      expect(x).toMatchSnapshot()
    })
  })
}

testWithSeed(SEED.ONE)
testWithSeed(SEED.TWO)
