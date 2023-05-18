import { repeat } from './repeat'

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
