var glob = require('glob')
var fs = require('fs')
var path = require('path')
var debug = require('debug')('metalsmith-metadata-glob')

module.exports = plugin

function plugin (opts) {
  opts = opts || {}
  var dir = opts.directory

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()

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
          var theKey = fileName.replace(/\.[^/.]+$/, '')
          var theContents = JSON.parse(data)

          metadata[theKey] = theContents

          debug('thekey', theKey)
          debug('file content', theContents)
          debug('metalsmith metadata', metadata)
        })
      })
    })

    done()
  }
}
