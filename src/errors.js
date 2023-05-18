import CONSTANTS from './constants'

export const ERRORS = {
  TOO_BIG: 'Number exceeds acceptable JavaScript integer size!',
  TOO_SMALL: 'Number is below acceptable JavaScript integer size!',
  MIN_UNDER_MAX: 'Minimum must be smaller than maximum!',
}

export function throwOnInvalidInteger(x) {
  const minTest = testValidInteger(x)
  if (minTest) {
    throw new RangeError(ERRORS[minTest])
  }
}

export function testValidInteger(x) {
  if (x >= CONSTANTS.MAX_INT) {
    return 'TOO_BIG'
  }
  if (x <= CONSTANTS.MIN_INT) {
    return 'TOO_SMALL'
  }
  return false
}
