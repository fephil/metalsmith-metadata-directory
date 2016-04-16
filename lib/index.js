var glob = require('glob')
var fs = require('fs')
var path = require('path')

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

    glob(dir, function (err, files) {
      if (err) {
        throw new Error(err)
      }

      files.forEach(function (file) {
        fs.readFile(file, 'utf8', function (err, data) {
          if (err) {
            throw new Error(err)
          }

          var fileName = path.basename(file)
          var theKey = fileName.replace(/\.[^/.]+$/, '')
          var theContents = JSON.parse(data)

          metadata[theKey] = theContents
        })
      })
    })

    done()
  }
}
