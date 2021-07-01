# unusual

A toolkit for idempotent randomness

Inspired by `chance` but designed to be much smaller in size.

## Installation

Install with `npm` or `yarn`:

```sh
npm i unusual
```
or
```sh
yarn add unusual
```

## Usage

Add `unusual` to your files like so:

```js
const Unusual = require('unusual')
// or, in ESM
import Unusual from 'unusual'

const SEED = 420 // accepts numbers / strings / arrays

const unusualInstance = new Unusual(SEED)
```

Then you will be able to use `unusualInstance`'s instance methods such as:

## API

### random

Just like `Math.random` but consistent via a given seed value.

```js
const x = unusualInstance.random()
console.log(x) // 0.31564591475762427
```

### integer

Given a `min` and a `max` value, generate a random number between the two.

```js
const x = unusualInstance.integer({min: 0, max: 30})
console.log(x) // 15
```

### pick

Given an array of values, pick one randomly.

```js
const x = unusualInstance.pick('random'.split(''))
console.log(x) // 'n'
```

### pickKey

Given an object, pick a key randomly.

```js
const input = {a: 'aardvark', b: 'beetle', c: 'crab'}
const x = unusualInstance.pickKey(input)
console.log(x) // 'a'
```

### pickValue

Given an object, pick a value randomly.

```js
const input = {a: 'aardvark', b: 'beetle', c: 'crab'}
const x = unusualInstance.pickValue(input)
console.log(x) // 'aardvark'
```

### floor

A shorthand equivalent to: `Math.floor(Math.random() * x)`

```js
const x = unusualInstance.floor(100)
console.log(x) // 87
```

### floorMin

A shorthand equivalent to: `Math.floor(Math.random() * x) + min)`
Please note that the minimum value comes first (and this function is curried):

```js
const x = unusualInstance.floorMin(10, 5)
console.log(x) // 10
```

### shuffle

Shuffle a given array.

```js
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const x = unusualInstance.shuffle(alphabet)
console.log(x)
/* [
  'j', 'e', 'x', 'p', 'f', 'r',
  'd', 'g', 'z', 'l', 't', 'u',
  'o', 'a', 'n', 'v', 's', 'k',
  'h', 'm', 'c', 'y', 'b', 'i',
  'w', 'q'
] */
```

## Debugging

This module ships with an identical but easier-to-debug copy of its core API.

It uses `envtrace` / `debug` under the hood.

To use it, simply change:

```js
import Unusual from 'unusual'
```
to
```js
import Unusual from 'unusual/debug'
```
instead.

Then in node you can set the `DEBUG='unusual:*'` environment variable (or in browser, you can set: `localStorage.debug = 'unusual:*'`) in order to see per-function logging.

Please see the documentation for [envtrace](https://www.npmjs.com/package/envtrace) and [debug](https://www.npmjs.com/package/debug) for more information.
