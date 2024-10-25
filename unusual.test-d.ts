import { expectType } from 'tsd'
import type { UnusualInstance } from '.'
import U from './unusual'

const u = U('test-with-types!')
expectType<UnusualInstance>(u)

expectType<number>(u.random())
expectType<number>(u.integer({ min: 0, max: 10 }))
expectType<string>(u.pick('alphabet'.split('')))
expectType<string>(u.pickKey({ a: 1, b: 2, c: 3 }))
expectType<number>(u.pickValue<number>({ a: 1, b: 2, c: 3 }))
expectType<number>(u.floor(1000))
expectType<number>(u.floorMin(1, 100))
expectType<number[]>(u.shuffle([1, 2, 3, 4, 5]))
