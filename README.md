# use-synced [![NPM version](https://img.shields.io/npm/v/use-synced.svg?style=flat)](https://www.npmjs.com/package/use-synced) [![NPM monthly downloads](https://img.shields.io/npm/dm/use-synced.svg?style=flat)](https://npmjs.org/package/use-synced) [![NPM total downloads](https://img.shields.io/npm/dt/use-synced.svg?style=flat)](https://npmjs.org/package/use-synced) 

> Keeping different tabs of your React app synced has never been this easy!!! :smile:

Please consider following this project's author, [Sina Bayandorian](https://github.com/sina-byn), and consider starring the [project](https://github.com/sina-byn/use-synced) to show your :heart: and support.

A simple React hook that provides you with a state and its setState function that is synced between all tabs of your application. With support for the debounce functionality and fully type-safe as it's written in TypeScript. :rocket:

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Hook](#hook)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/package/use-synced):

```sh
$ npm install use-synced --save
```

## Usage

```js
import useSynced from 'use-synced';

const MyComponent = () => {
  const [count, setCount] = useSynced('count', 0);
  // the count state is synced between different tabs of your app

  return (
    <div>
      <button onClick={() => setCount(prev => ++prev)}>Increment</button>
      { count } 
    </div>
  );
};

export default MyComponent;
```

## Hook

### useSynced

returns a state that is synced between different tabs of the same application - utilizes localstorage or sessionstorage behind the scenes and can be configured to best fit the needs of your application

**Params**
* `key` : **String** - the key that is used to store the value in local/sessionstorage

* `initialValue` : **Any** - the initial value of the state is used if the value is not already stored

* `options` : **Object** - additional configuration of the hook

  * `type` : **'local' | 'session'** - optional - defaults to `'local'` - type of the storage used to sync the state

  * `delay` : **Number** - optional - defaults to `undefined` - the delay after which the tabs are synced - delay of the debounced sync function

**Returns**
* `[syncedState, setSyncedState]` : **[Any, Function]**


## License

```
MIT License

Copyright (c) 2024 Sina Bayandorian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```