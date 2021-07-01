import { curry } from "katsu-curry"
import Twister from "./fast-twister"
import { trace, logWrap } from "./trace"
import { ERRORS, throwOnInvalidInteger } from "./errors"

function Unusual(seed) {
  if (!(this instanceof Unusual)) {
    // eslint-disable-next-line no-unused-vars
    return seed ? new Unusual(seed) : new Unusual()
  }
  this.seed = Array.isArray(seed) || typeof seed === "number" ? seed : 0
  if (typeof seed === "string") {
    let seedling = 0
    let hash = 0
    seed.split("").forEach((c, i) => {
      hash = seed.charCodeAt(i) + (hash << 6) + (hash << 16) - hash
      trace.constructor("hash", { hash, seedling })
      seedling += hash
    })
    this.seed += seedling
  }
  trace.constructor("seed", this.seed)
  const twister = new Twister(this.seed)
  const random = () => {
    const value = twister.random()
    trace.random("output", value)
    return value
  }

  function integer({ min, max }) {
    const test = [min, max]
    test.map(throwOnInvalidInteger)
    if (min > max) {
      throw new RangeError(ERRORS.MIN_UNDER_MAX)
    }
    return Math.floor(random() * (max - min + 1) + min)
  }
  function pick(list) {
    const max = list.length - 1
    const index = integer({ min: 0, max })
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
    trace.floorMin("input", { min, x })
    const output = floor(x) + min
    trace.floorMin("output", output)
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
  this.integer = logWrap("integer", integer)
  this.pick = logWrap("pick", pick)
  this.pickKey = logWrap("pickKey", pickKey)
  this.pickValue = logWrap("pickValue", pickValue)
  this.floor = logWrap("floor", floor)
  this.floorMin = curry(floorMin)
  this.shuffle = logWrap("shuffle", shuffle)
  return this
}

module.exports = Unusual
