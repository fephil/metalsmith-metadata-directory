var expect = require('chai').expect
var Metalsmith = require('metalsmith')
var metadata = require('..')

it('should read JSON and put into metalsmith.metadata()', function (done) {
  var metalsmith = Metalsmith('test/fixtures/json').use(metadata({ directory: 'test/fixtures/json/src/**/*.json' }))
  metalsmith.build(function(err) {
    if (err) {
      return done(err)
    }

    expect(metalsmith.metadata()).to.deep.equal({ example: { text: 'Text from a json file' } })
    done()
  })
})
