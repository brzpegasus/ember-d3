# ember-d3 [![Build Status](https://travis-ci.org/ivanvanderbyl/ember-d3.svg?branch=master)](https://travis-ci.org/ivanvanderbyl/ember-d3) [![Ember Observer Score](https://emberobserver.com/badges/ember-d3.svg)](https://emberobserver.com/addons/ember-d3) [![npm version](https://badge.fury.io/js/ember-d3.svg)](https://badge.fury.io/js/ember-d3) [![Dependency Status](https://david-dm.org/brzpegasus/ember-d3.svg)](https://david-dm.org/ivanvanderbyl/ember-d3) [![devDependency Status](https://david-dm.org/ivanvanderbyl/ember-d3/dev-status.svg)](https://david-dm.org/ivanvanderbyl/ember-d3.svg#info=devDependencies)

This Ember Addon acts as a loader for consuming [D3.js](https://github.com/mbostock/d3/) within your Ember application or Addon. It works by applying a lightweight AMD transform around the D3 UMD builds which can be consumed by Ember CLI, making it possible to import any individual D3 package or the entire bundle as "d3" from NPM.

```bash
ember install ember-d3
npm install d3 --save
```

**Requirements:**

* NPM >= 3 (Check by running `npm version`)
* Node >= 8 (Check by running `node --version`)
* Ember CLI >= 2.16 (Check by running `ember version`)

You can upgrade NPM by running:

```
npm i -g npm@3
```

**If you're looking for the `ember-d3` for `d3@3.x`, see the `v3` branch.**

## Loading 3rd Party D3 Plugins

If you want to use 3rd party plugins, like `d3-selection-multi` or `d3-flame-graph`, simply add them to your project and the module loader will automatically detect them, and any other packages beginning with `d3-` in the name.

## Advanced Installation

You can specify any `d3` version on the v4 release by adding it to your project:

```
npm install --save-dev d3@4.9.1
```

## Configuration and Usage:

There's two ways to use this library in your project, you can either load just
the APIs you desire, or you can import the entire D3 object (similar to version 3).

**Option 1:**

```js
import { line } from 'd3-shape'
import { scaleOrdinal } from 'd3-scale'
import { extent } from 'd3-array'
```

**Option 2:**

_See Global D3 section below for configuration_

```js
import D3 from 'd3'
```

We've put together a [complete demo component](https://github.com/ivanvanderbyl/ember-d3/blob/master/tests/dummy/app/components/simple-circles.js)
which you can use to really get a feel for how to use the different packages provided by this addon.

### Global D3

We don't support the global `window.d3` object, as this is viewed as an anti-pattern. However,
you can expose a bundled import of d3 by enabling the `bundle` config flag:

```js
module.exports = function() {
  return {
    'ember-d3': {
      bundle: true
    }
  }
}
```

This will allow you to do:

```js
import d3 from 'd3'
```

_Note: This will disable support for using the dependency whitelist/blacklist._

#### Dependency whitelist/blacklist

In case you do not want to include _all_ of d3's dependencies, you may whitelist
the packages that you want to include in your project's `config/environment.js` file.

For example, if you only wanted to use `d3-scale`, you would do:

```js
// config/environment.js
module.exports = function() {
  return {
    'ember-d3': {
      only: ['d3-scale']
    }
  }
}
```

Or if you want to exclude a package:

```js
// config/environment.js
module.exports = function() {
  return {
    'ember-d3': {
      except: ['d3-scale']
    }
  }
}
```

**Note**: Even though you only add `d3-scale`, it has a few transitive d3 dependencies.
**You will need to add these to the whitelist as needed.**

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

# Contributing

This addon is developed by the community and is maintained by [Ivan Vanderbyl](https://github.com/ivanvanderbyl).

All contributions are welcome by opening an issue or Pull Request.
