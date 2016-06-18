var glob = require('glob')
var fs = require('fs')
var path = require('path')
var async = require('async')
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

    debug('Original Metalsmith metadata', metadata)

    glob(dir, function (err, files) {
      if (err) {
        done(new Error('Glob error: ' + err))
      }

      debug('Number of files found by Glob', files.length)
      debug('Files found by Glob', files)

      if (files.length === 0) {
        done(new Error('No files found in directory: ' + dir))
      }

      async.forEach(files, function (file, callback) {
        var fileName = path.basename(file)
        var theKey = fileName.replace(/\.[^/.]+$/, '')
        var theContents = fs.readFileSync(file, 'utf8')

        try {
          var json = JSON.parse(theContents)
        } catch (error) {
          return done(new Error('Malformed data in ' + fileName))
        }

        debug('File name read', file)
        debug('File key', theKey)
        debug('File JSON contents', theContents)

        metadata[theKey] = json
        callback()
      }, function (err) {
        debug('Async callback triggered')

        if (err) {
          done(new Error('Async error: ' + err))
        }

        debug('New Metalsmith metadata', metadata)
        done()
      })
    })
  }
}
