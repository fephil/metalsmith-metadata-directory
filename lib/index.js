var fs = require('fs')

module.exports = plugin

function plugin (opts) {
  opts = opts || {}

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()

    console.log(metadata)

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
