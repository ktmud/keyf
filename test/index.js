var should = require('should')
var keyf = require('../')

describe('keyf', function() {

  it('should handle arguments index', function() {
    var formatter = keyf('foo:{0}:{1}')
    function f(a, b) {
      formatter(arguments).should.eql('foo:a:b')
    }
    f('a', 'b')
  })

  it('should handle object', function() {
    var context = { a: 1, b: 2 }
    var formatter = keyf('foo:{a}:{b}')
    formatter(context).should.eql('foo:1:2')
  })

  it('should accept context', function() {
    var context = { a: 1, b: 2 }
    var formatter = keyf('foo:{a}:{b}')
    formatter.call(context).should.eql('foo:1:2')
  })

  it('should handle predefined', function() {
    var obj = { a: 1, b: 2 }
    var formatter = keyf('foo:{0}:{a}:{b}', obj)
    formatter([0]).should.eql('foo:0:1:2')
  })

  it('should dive into object', function() {
    var context = { a: 1, b: { b1: 2 } }
    var formatter = keyf('foo:{0}:{a}:{b.b1}')
    formatter.call(context).should.eql('foo:{0}:1:2')
  })

  it('should level null/undefined value intact', function() {
    var context = { a: 1, b: { b1: 2 } }
    var formatter = keyf('foo:{0}')
    formatter(context).should.eql('foo:{0}')
  })

})
