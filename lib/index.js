var glob = require('glob')
var fs = require('fs')
var path = require('path')
var debug = require('debug')('metalsmith-metadata-glob')

module.exports = plugin

function plugin (opts) {
  opts = opts || {}
  var dir = opts.directory

  glob(dir, function (err, files) {
    if (err) {
      throw err
    }

    files.forEach(function (file) {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          throw err
        }

        var fileName = path.basename(file)
        var stripExtension = fileName.replace(/\.[^/.]+$/, '')
        debug('file name without extension', stripExtension)

        var obj = JSON.parse(data)
        debug('json output', obj)
      })
    })
  })

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
