var fs = require('fs')
var debug = require('debug')('metalsmith-metadata-glob')

module.exports = plugin

function plugin (opts) {
  opts = opts || {}

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()
    var keys = Object.keys(files)

    debug('files', files)
    debug('metadata', metadata)
    debug('keys', keys)

    /*
    fs.readFile('test.json', 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      testOutput = JSON.parse(data)
    })
    */

    done()
  }
}
