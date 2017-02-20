var test = require('tape')
var minify = require('../')
var exclude = require('../excluded.js')

var browserify = require('../fixtures/browserify.json')

test('can',function(t){
  var min = minify(browserify)
  var objCount = {}
  var versionCount = {}

  exclude(min,browserify,objCount,versionCount)

  console.log(objCount)
  console.log(versionCount)
  t.end()
})

