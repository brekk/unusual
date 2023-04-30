import { complextrace } from 'envtrace'
import { curry, pipe } from 'katsu-curry'

export const trace = complextrace('unusual', [
  'constructor',
  'twister',
  'twisterTwist',
  'twisterInitArray',
  'twisterInitNumber',
  'twisterInit',
  'random',
  'integer',
  'pick',
  'pickKey',
  'pickValue',
  'floor',
  'floorMin',
  'shuffle',
])

export const logWrap = curry((key, fn, input) =>
  pipe(trace[key]('input'), fn, trace[key]('output'))(input)
)
