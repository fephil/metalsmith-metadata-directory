# metalsmith-metadata-directory

[![npm](https://img.shields.io/npm/v/metalsmith-metadata-directory.svg)](https://www.npmjs.com/package/metalsmith-metadata-directory)
[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)]()
[![Build Status](https://travis-ci.org/fephil/metalsmith-metadata-directory.svg?branch=master)](https://travis-ci.org/fephil/metalsmith-metadata-directory)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/fephil/metalsmith-metadata-directory/master/LICENSE)

> A Metalsmith plugin to add a directory of JSON files for use as global metadata in templates, partials and pages.

* Author: [Phil Lennon](https://frontendphil.com)
* Source: [github.com/fephil/metalsmith-metadata-directory](https://github.com/fephil/metalsmith-metadata-directory)
* Issues & Suggestions: [github.com/fephil/metalsmith-metadata-directory/issues](https://github.com/fephil/metalsmith-metadata-directory/issues)
* Releases: [https://github.com/fephil/metalsmith-metadata-directory/releases](https://github.com/fephil/metalsmith-metadata-directory/releases)
* Twitter: [@frontendphil](https://twitter.com/frontendphil)
* Email: [enquiry@frontendphil.com](mailto:enquiry@frontendphil.com)

***

## About

This plugin supports adding directory of `.json` files and makes their contents available to the Metalsmith global metadata without needing to declare multiple files or file names. Subdirectories and multiple files are supported by using a globbing pattern.

## Installation

Install the plugin using npm, and specify the directory of metadata files you want to use, along with a globbing pattern. Currently, only JSON files are supported.

```
$ npm install metalsmith-metadata-directory --save-dev
```

### With Metalsmith CLI

Add the plugin to your metalsmith.json file:

```json
{
  "plugins": {
    "metalsmith-metadata-directory": {
      "directory": "/src/data/**/*.json"
    }
  }
}
```

### With Javascript

Pass the plugin into metalsmith.use

```js
var metalsmith = require('metalsmith')
var metadata = require('metalsmith-metadata-directory')

metalsmith.use(metadata({
  directory: '/src/data/**/*.json'
}));
```

## Plugin Ordering

It is vital to order Metalsmith plugins correctly. Please make sure this plugin is included above metalsmith-layouts and metalsmith-in-place and any other plugin which may need your metadata.

## Usage within Metalsmith

Data is called by referencing the filename without an extension. If there was a global.json file containing a url key, the reference in your page or template would look like:

```js
{{global.url}}
```

My workflow [Garrus](https://github.com/fephil/garrus) has an example of this plugin being used.

## Debug mode

This plugin supports debugging output. To enable, use the following command when running Metalsmith:

```
$ DEBUG=metalsmith-metadata-directory metalsmith
```

## Licence

MIT
