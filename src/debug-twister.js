import { logWrap } from './trace'
// This is a nearly 1:1 port of fast-twister
// A few small modifications were made, in order to:
// 1. add conditional logging
// 2. match existing lint / best-practices
// 3. deal with ESM modules
// The original license of fast-twister:
// https://gitlab.com/rockerest/fast-mersenne-twister/-/blob/master/LICENSE
// and it has been placed below for consistency
/*
-------------------------
The below license is duplicated per the terms of the original software.

Per http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/MT2002/elicense.html ,
the Mersenne Twister has no usage restrictions.
-------------------------

Coded by Takuji Nishimura and Makoto Matsumoto.

Before using, initialize the state by using init_genrand(seed)
or init_by_array(init_key, key_length).

Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

	1. Redistributions of source code must retain the above copyright
	notice, this list of conditions and the following disclaimer.

	2. Redistributions in binary form must reproduce the above copyright
	notice, this list of conditions and the following disclaimer in the
	documentation and/or other materials provided with the distribution.

	3. The names of its contributors may not be used to endorse or promote
	products derived from this software without specific prior written
	permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Any feedback is very welcome.
http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)

-------------------------

Additionally, the implementation in this repository (mersenne.js), is a VERY
heavily modified version of Stephan Brumme's version of the Mersenne Twister,
found here: https://create.stephan-brumme.com/mersenne-twister/

The license for that implementation is below.

-------------------------

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.

-------------------------

It has already been stated, but bears repeating:

While this implementation is based on Stephan Brumme's code, it has been
    very heavily modified - primarily for syntax, but also some small algorithm changes
    to make it agree with the original C version from Matsumoto & Nishimura

*/

const N = 624
const N_MINUS_1 = 623
const M = 397
const M_MINUS_1 = 396
const DIFF = N - M
const MATRIX_A = 0x9908b0df
const UPPER_MASK = 0x80000000
const LOWER_MASK = 0x7fffffff

const twist = logWrap('twisterTwist', function _twist(state) {
  let bits

  for (let i = 0; i < DIFF; i++) {
    bits = (state[i] & UPPER_MASK) | (state[i + 1] & LOWER_MASK)
    state[i] = state[i + M] ^ (bits >>> 1) ^ ((bits & 1) * MATRIX_A)
  }
  for (let i = DIFF; i < N_MINUS_1; i++) {
    bits = (state[i] & UPPER_MASK) | (state[i + 1] & LOWER_MASK)
    state[i] = state[i - DIFF] ^ (bits >>> 1) ^ ((bits & 1) * MATRIX_A)
  }

  bits = (state[N_MINUS_1] & UPPER_MASK) | (state[0] & LOWER_MASK)
  state[N_MINUS_1] = state[M_MINUS_1] ^ (bits >>> 1) ^ ((bits & 1) * MATRIX_A)

  return state
})

const initializeWithArray = logWrap(
  'twisterInitArray',
  function _initializeWithArray(seedArray) {
    const state = initializeWithNumber(19650218)
    const len = seedArray.length

    let i = 1
    let j = 0
    let k = N > len ? N : len

    for (; k; k--) {
      const s = state[i - 1] ^ (state[i - 1] >>> 30)
      state[i] =
        (state[i] ^
          (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
            (s & 0x0000ffff) * 1664525)) +
        seedArray[j] +
        j
      i++
      j++
      if (i >= N) {
        state[0] = state[N_MINUS_1]
        i = 1
      }
      if (j >= len) {
        j = 0
      }
    }
    for (k = N_MINUS_1; k; k--) {
      const s = state[i - 1] ^ (state[i - 1] >>> 30)

      state[i] =
        (state[i] ^
          (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
            (s & 0x0000ffff) * 1566083941)) -
        i
      i++
      if (i >= N) {
        state[0] = state[N_MINUS_1]
        i = 1
      }
    }

    state[0] = UPPER_MASK

    return state
  }
)

const initializeWithNumber = logWrap(
  'twisterInitNumber',
  function _initializeWithNumber(seed) {
    const state = new Array(N)

    // fill initial state
    state[0] = seed
    for (let i = 1; i < N; i++) {
      const s = state[i - 1] ^ (state[i - 1] >>> 30)
      state[i] =
        ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        i
    }

    return state
  }
)

const initialize = logWrap(
  'twisterInit',
  function _initialize(seed = Date.now()) {
    const state = Array.isArray(seed)
      ? initializeWithArray(seed)
      : initializeWithNumber(seed)
    return twist(state)
  }
)
const MersenneTwister = logWrap('twister', function _MersenneTwister(seed) {
  let state = initialize(seed)
  let next = 0
  const randomInt32 = () => {
    let x
    if (next >= N) {
      state = twist(state)
      next = 0
    }

    x = state[next++]

    x ^= x >>> 11
    x ^= (x << 7) & 0x9d2c5680
    x ^= (x << 15) & 0xefc60000
    x ^= x >>> 18

    return x >>> 0
  }
  const api = {
    // [0,0xffffffff]
    randomNumber: () => randomInt32(),
    // [0,0x7fffffff]
    random31Bit: () => randomInt32() >>> 1,
    // [0,1]
    randomInclusive: () => randomInt32() * (1.0 / 4294967295.0),
    // [0,1)
    random: () => randomInt32() * (1.0 / 4294967296.0),
    // (0,1)
    randomExclusive: () => (randomInt32() + 0.5) * (1.0 / 4294967296.0),
    // [0,1), 53-bit resolution
    random53Bit: () => {
      const a = randomInt32() >>> 5
      const b = randomInt32() >>> 6
      return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0)
    },
  }

  return api
})

export default MersenneTwister
