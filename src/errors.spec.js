import CONSTANTS from './constants'
import { ERRORS, throwOnInvalidInteger, testValidInteger } from './errors'

test('constants', () => {
  expect(ERRORS).toMatchSnapshot()
})

test('throwOnInvalidInteger', () => {
  expect(() => throwOnInvalidInteger(CONSTANTS.MAX_INT + 1)).toThrow()
  expect(() => throwOnInvalidInteger(CONSTANTS.MIN_INT - 1)).toThrow()
  expect(() => throwOnInvalidInteger(0)).not.toThrow()
})

test('testValidInteger', () => {
  expect(testValidInteger(CONSTANTS.MAX_INT + 1)).toEqual('TOO_BIG')
  expect(testValidInteger(CONSTANTS.MIN_INT - 1)).toEqual('TOO_SMALL')
  expect(testValidInteger(0)).toBeFalsy()
})
