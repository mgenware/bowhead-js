# bowhead-js

[![Build Status](https://github.com/mgenware/bowhead-js/workflows/Build/badge.svg)](https://github.com/mgenware/bowhead-js/actions)
[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![npm version](https://img.shields.io/npm/v/bowhead-js.svg?style=flat-square)](https://npmjs.com/package/bowhead-js)
[![Node.js Version](http://img.shields.io/node/v/bowhead-js.svg?style=flat-square)](https://nodejs.org/en/)

Tiny string interpolation library, written in TypeScript.

## Installation

```sh
yarn add bowhead-js
```

## Usage

```js
import format from 'bowhead-js';

// Index-based arguments.
format('{1} {0} {1}', 1, 'haha'); // 'haha 1 haha'

// Custom functions.
format('{0:uppercase}', 'haha'); // 'HAHA'

// Plurals.
format('{0:countable:fish:fishes}', '1'); // 'fish';
format('{0:countable:fish:fishes}', '2'); // 'fishes'
format('{0:countable:fish:fishes}', '0'); // 'fishes'
// "deer" is both singular and plural.
format('{0:countable:deer}', '1'); // 'deer'
format('{0:countable:deer}', '2'); // 'deer'
```

### Functions available

- `uppercase` to uppercase
- `lowercase` to lowercase
- `capitalized` capitalizes first letter
- `countable` handles plurals

### Error handling

By default, bowhead-js mutes index-out-of-range errors being thrown and returns error messages in resulting strings, you can disable this behavior by calling `muteExceptions`:

```js
import { muteExceptions } from 'bowhead-js';

format('{1} {7}', 23, 'haha'))
// Prints 'haha <7 is out of range>'

muteExceptions(false);
format('{1} {7}', 23, 'haha'))
// Error thrown.
```
