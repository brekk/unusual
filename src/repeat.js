import { curry } from 'katsu-curry'

export const repeat = curry((total, fn) =>
  Array(total)
    .fill(0)
    .map((_, i) => fn(i))
)
