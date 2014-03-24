# keyf

Key formatter for function arguments

## Usage

```javascript
var keyf = require('keyf')
var formatter = keyf('some-prefix:{_abc_}:{0}:{this.foo}:{1.bar}', {
  '_abc_': 'pre-defined-value'
})

User.prototype.foo = 'abc'

User.prototype.cacheKey = function() {
 return formatter.call(this, arguments)
}
var user = new User()

user.cacheKey(1, { bar: '2' })
// -> some-prefix:pre-defined-value:1:abc:2
```

## License

the MIT license.
