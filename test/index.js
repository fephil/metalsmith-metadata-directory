require('harmonize')()

var should = require('chai').should()
var Metalsmith = require('metalsmith')
var metadata = require('../lib/index.js')

it('should error if the JSON file is malformed', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-malformed').use(metadata({ directory: 'test/fixtures/json-malformed/src/**/*.json' }))
  metalsmith.build(function(err) {
    errMessage = String(err);
    err.should.be.an('error')
    errMessage.should.equal('Error: Malformed data in example.json')

    done() // don't return the error to metalsmith
  })
})

it('should ignore a JSON file if is empty', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-empty').use(metadata({ directory: 'test/fixtures/json-empty/src/**/*.json' }))
  metalsmith.build(function(err) {
    metalsmith.metadata().should.deep.equal({ example: { text: 'Text from a json file' } })

    if (err) {
      return done(err)
    }

    done()
  })
})

it('should read JSON and put into metalsmith.metadata()', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json').use(metadata({ directory: 'test/fixtures/json/src/**/*.json' }))
  metalsmith.build(function(err) {
    metalsmith.metadata().should.deep.equal({ example: { text: 'Text from a json file' } })

    if (err) {
      return done(err)
    }

    done()
  })
})
