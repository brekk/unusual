import { curry } from 'katsu-curry'
import Twister from './fast-twister'
import { ERRORS, throwOnInvalidInteger } from './errors'

export { repeat } from './repeat'

export function Unusual(seed) {
  if (!(this instanceof Unusual)) {
    // eslint-disable-next-line no-unused-vars
    return seed ? new Unusual(seed) : new Unusual()
  }
  this.seed = Array.isArray(seed) || typeof seed === 'number' ? seed : 0
  if (typeof seed === 'string') {
    let seedling = 0
    let hash = 0
    seed.split('').forEach((c, i) => {
      hash = seed.charCodeAt(i) + (hash << 6) + (hash << 16) - hash
      seedling += hash
    })
    this.seed += seedling
  }
  const twister = new Twister(this.seed)
  const random = twister.random

  function integer({ min, max }) {
    const test = [min, max]
    test.map(throwOnInvalidInteger)
    if (min > max) {
      throw new RangeError(ERRORS.MIN_UNDER_MAX)
    }
    return Math.floor(random() * (max - min + 1) + min)
  }
  const int = curry(function __int(min, max) {
    return integer({ min, max })
  })
  function pick(list) {
    const max = list.length - 1
    const index = int(0, max)
    return list[index]
  }

  function pickKey(obj) {
    const keys = Object.keys(obj)
    return pick(keys)
  }
  function pickValue(obj) {
    const key = pickKey(obj)
    return obj[key]
  }
  function floor(x) {
    return Math.floor(random() * x)
  }
  function floorMin(min, x) {
    const output = floor(x) + min
    return output
  }
  function shuffle(list) {
    const copy = [].concat(list)
    let start = copy.length
    while (start-- > 0) {
      const index = floor(start + 1)
      const a = copy[index]
      const b = copy[start]
      copy[index] = b
      copy[start] = a
    }
    return copy
  }
  this.random = random
  this.integer = integer
  this.int = int
  this.pick = pick
  this.pickKey = pickKey
  this.pickValue = pickValue
  this.floor = floor
  this.floorMin = curry(floorMin)
  this.shuffle = shuffle
  return this
}
