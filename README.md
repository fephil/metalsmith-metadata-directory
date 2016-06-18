# metalsmith-metadata-directory

[![Build Status](https://travis-ci.org/fephil/metalsmith-metadata-directory.svg?branch=master)](https://travis-ci.org/fephil/metalsmith-metadata-directory)
[![Dependency Status](https://david-dm.org/fephil/metalsmith-metadata-directory.svg)](https://david-dm.org/fephil/metalsmith-metadata-directory)
[![NPM](https://nodei.co/npm/metalsmith-metadata-directory.png?mini=true)](https://nodei.co/npm/metalsmith-metadata-directory/)

**A Metalsmith plugin to add a directory of JSON files for use in templates and pages**

* Author: [Phil Lennon](https://frontendphil.com)
* Source: [github.com/fephil/metalsmith-metadata-directory](https://github.com/fephil/metalsmith-metadata-directory)
* Issues and Suggestions: [github.com/fephil/metalsmith-metadata-directory/issues](https://github.com/fephil/metalsmith-metadata-directory/issues)
* Download: [https://github.com/fephil/metalsmith-metadata-directory/releases](https://github.com/fephil/metalsmith-metadata-directory/releases)
* Twitter: [@frontendphil](https://twitter.com/frontendphil)
* Email: [enquiry@frontendphil.com](mailto:enquiry@frontendphil.com)

***

## About

This plugin supports selecting a directory of `.json` files using a globbing pattern and makes their contents available to the Metalsmith global metadata. Subdirectories and multiple files are supported.

## Installation

```
$ npm install metalsmith-metadata-directory --save-dev
```

## Plugin Ordering

It is vital to order Metalsmith plugins correctly. As such, please make sure this plugin is included above metalsmith-layouts and metalsmith-in-place.

## CLI Usage

Install the plugin using npm, and simply specify the directory you want to use, along with a globbing pattern. Only JSON is currently supported.

```json
{
  "plugins": {
    "metalsmith-metadata-directory": {
      "directory": "/src/data/**/*.json"
    }
  }
}
```

## Javascript Usage

```js
var metalsmith = require('metalsmith')
var metadata = require('metalsmith-metadata-directory')

metalsmith.use(metadata({
  directory: '/src/data/**/*.json'
}));
```

## Usage within Metalsmith

Data is called by referencing the filename without an extension. If there was a global.json file containing a url property, the reference in your page or template would look like:

```js
{{global.url}}
```

My workflow [Foley](https://github.com/fephil/foley) has an example of this plugin being used.

## Debug mode

This plugin supports debugging output. To enable, use the following command:

```
$ DEBUG=metalsmith-metadata-directory metalsmith
```

## Licence

MIT
