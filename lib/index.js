var glob = require('glob')
var fs = require('fs')
var path = require('path')
var debug = require('debug')('metalsmith-metadata-directory')

// Make the plugin available
module.exports = plugin

/**
 * Metalsmith plugin to take a directory of json files
 * and make them available in the global metadata
 *
 * @param {Object} opts
 * @return {Function}
*/
function plugin (opts) {
  opts = opts || {}
  var dir = opts.directory

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()

    debug('original metalsmith metadata', metadata)

    glob.sync(dir, function (err, files) {
      if (err) {
        done(new Error(err))
      }

      debug('files found by glob', files)

      files.forEach(function (file) {
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) {
            done(new Error(err))
          }

          var fileName = path.basename(file)
          var theKey = fileName.replace(/\.[^/.]+$/, '')
          var theContents = JSON.parse(data)

          debug('file key', theKey)
          debug('file json contents', theContents)

          metadata[theKey] = theContents
        })
      })
    })

    debug('new metalsmith metadata', metadata)
    done()
  }
}
