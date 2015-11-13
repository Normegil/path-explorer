'use strict';

var test = require('tape');
var pathExplorer = require('../index.js');

var moduleName = 'path-explorer ';
test(moduleName + 'should require get.js for the getter', function(assert) {
  assert.equal(pathExplorer.get, require('../lib/get.js'));
  assert.end();
});

test(moduleName + 'should require set.js for the setter', function(assert) {
  assert.equal(pathExplorer.set, require('../lib/set.js'));
  assert.end();
});
