import { repeat } from './repeat'
import Unusual from './index'

test('repeat', () => {
  expect(repeat(10, i => (i % 2 === 0 ? 'even' : 'crooked'))).toEqual([
    'even',
    'crooked',
    'even',
    'crooked',
    'even',
    'crooked',
    'even',
    'crooked',
    'even',
    'crooked',
  ])
})

test('Unusual.repeat', () => {
  const u = Unusual('nice')
  const hexy = Unusual.repeat(10, () => u.pick('abcdef0123456789'.split('')))
  expect(hexy).toMatchSnapshot()
})
