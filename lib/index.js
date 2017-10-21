var glob = require('glob');
var fs = require('fs');
var path = require('path');
var async = require('async');
var debug = require('debug')('metalsmith-metadata-directory');
var yaml = require('./yml');

// Make the plugin available
module.exports = plugin;

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

  /*
   * Fix for resolving local path
   * @param {Metalsmith} metalsmith The metalsmith instance
   * @returns The absolute path including initial globbing pattern
   */
  function resolvePath(metalsmith) {
    var globStart = false;                            // Indicator, if globbing pattern was found yet
    var cwd = metalsmith.directory();                 // Get Metalsmith working directory
    var subPath = [];
    var pattern = [];
    var directory = dir.split('/');
    directory.forEach(function parsePathElems(elem) {
      if (globStart || elem.search(/[^a-z0-9\.\-_]/gi) >= 0) {   // Search in current path segment for glob patterns
        globStart = true;                 // If true, set globStart to true
        return pattern.push(elem);        // add to pattern now and in future automatically
      }
      return subPath.push(elem);
    });

    // Now check if calculated path is existing (absolute vs relative position to Metalsmith CWD)
    var localPath = path.resolve(cwd, subPath.join('/'));   // Assume path is relative to CWD, e.g. ./src/*.json
    if (!fs.existsSync(path.resolve(cwd, localPath))) {
      localPath = path.relative(cwd, subPath.join('/'));    // Assumption false, it was absolute, e.g. ./test/fixtures/...
    }

    return path.resolve(cwd, localPath, pattern.join('/')); // return correct path
  }

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()

    debug('Original Metalsmith metadata', metadata)

    // Get all files from specified directory
    if (Array.isArray(dir)) {
      dir = dir.map(function (d) {
        resolvePath(d);                   // Do for every member in array
      });
    } else {
      dir = resolvePath(metalsmith);     // Get previously calculated correct path
    }
    glob(dir, function (err, files) {
      if (err) {
        done(new Error('Glob error: ' + err))
      }

      debug('Number of files found by Glob', files.length)
      debug('Files found by Glob', files)

      // Error if directory is empty
      if (files.length === 0) {
        done(new Error('No files found in directory: ' + dir))
      }

      // For each found file
      async.forEach(files, function (file, callback) {
        var fileName = path.basename(file)
        var suffix = /\.([a-z]+)$/i.exec(fileName);
        var theKey = fileName.replace(/\.[^/.]+$/, '')
        var theContents = fs.readFileSync(file, 'utf8')

        // Error if the key already exists (duplicate file name)
        if (theKey in metadata) {
          return done(new Error('Duplicate file name: ' + fileName))
        }

        // Ignore file if it is empty
        if (theContents.length === 0) {
          return done()
        }

        if (suffix && suffix[1] && suffix[1].toLowerCase() === 'yml') {
          // Okay, we detected a file with 'yml' as suffix, let's try to parse it.
          try {
            var json = yaml(theContents);
          } catch (error) {
            return done(error);
          }
        } else {
          // Check to see if JSON is malformed
          try {
            var json = JSON.parse(theContents)
          } catch (error) {
            return done(new Error('Malformed data in: ' + fileName))
          }
        }

        // Debug information
        debug('File name read', file)
        debug('File key', theKey)
        debug('File JSON contents', theContents)

        // Add to metalsmith metadata
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
