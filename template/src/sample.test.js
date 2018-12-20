const expect = require('chai').expect
const sample = require('./sample')

describe('sample', () => {
  it('Should say hello', done => {
    expect(sample.hello()).eql('Hello World')
    done()
  })
})