/**
 * Key Formatter
 *
 * Get a key based replacer for you arguments
 *
 * Example:
 *
 *   var keyf = require('keyf')
 *   var formatter = keyf('some-prefix:{_abc_}:{0}:{this.foo}:{1.bar}', {
 *     '_abc_': 'pre-defined-value'
 *   })
 *
 *   User.prototype.save = function save() {
 *     var key = formatter.call(this, arguments)
 *   }
 *
 */

var KEY_PATTERN = /(%j)?{([\w\.]+)}/g

function getFormatter(key, predefined) {

  predefined = predefined || {}

  return function keyf() {
    var ks, v, k
    var self = this
    return key.replace(KEY_PATTERN, function(m, format, p1) {
      ks = p1.split('.')
      v = null
      k = ks.shift()
      if (predefined.hasOwnProperty(k)) {
        v = predefined[k]
      } else if (k === 'this') {
        v = self
      } else {
        v = isdigit(k) ? args[k] : self[k]
      }
      // dive into object
      while (v && ks.length && ks[0] in v) {
        v = v[ks.shift()]
      }
      // make the value jsonized
      if (format === '%j') {
        v = JSON.stringify(v)
      }
      // a `[object object]` should not be seen
      if (String(v).indexOf('[object ') === 0) {
        v = null
      }
      return v || m
    })
  }
}

function isdigit(s) {
  return !isNaN(Number(s))
}

module.exports = getFormatter