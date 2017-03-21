require('harmonize')() // Node 0.12 fix

var should = require('chai').should()
var Metalsmith = require('metalsmith')
var metadata = require('../lib/index.js')

it('should read a single JSON file and put into metalsmith.metadata()', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-single').use(metadata({ directory: 'src/**/*.json' }))
  metalsmith.build(function(err) {
    metalsmith.metadata().should.deep.equal({ example: { text: 'Text from a json file' } })

    if (err) {
      return done(err)
    }

    done()
  })
})

it('should read multiple JSON files and put into metalsmith.metadata()', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-multiple').use(metadata({ directory: 'test/fixtures/json-multiple/src/**/*.json' }))
  metalsmith.build(function(err) {
    metalsmith.metadata().should.deep.equal({ example: { text: 'Text from a json file' }, site: { url: 'http://test.dev' } })

    if (err) {
      return done(err)
    }

    done()
  })
})

it('should read multiple JSON files, including subdirctories and put into metalsmith.metadata()', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-subdirectory').use(metadata({ directory: 'test/fixtures/json-subdirectory/src/**/*.json' }))
  metalsmith.build(function(err) {
    metalsmith.metadata().should.deep.equal({ example: { text: 'Text from a json file' }, site: { url: 'http://test.dev' } })

    if (err) {
      return done(err)
    }

    done()
  })
})

it('should error if a JSON file is malformed', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-malformed').use(metadata({ directory: 'test/fixtures/json-malformed/src/**/*.json' }))
  metalsmith.build(function(err) {
    errMessage = String(err);
    err.should.be.an('error')
    errMessage.should.equal('Error: Malformed data in: example.json')

    done() // don't return the error to metalsmith
  })
})

it('should error if a key is already used', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json-duplicate').use(metadata({ directory: 'test/fixtures/json-duplicate/src/**/*.json' }))
  metalsmith.build(function(err) {
    errMessage = String(err);
    err.should.be.an('error')
    errMessage.should.equal('Error: Duplicate file name: example.json')

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
