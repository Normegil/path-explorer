'use strict';

var test = require('tape');

var h = require('../../lib/helper');
var moduleName = 'Helper';
var functionName = 'exist';

test(moduleName + '.' + functionName + '() ' + 'should be false if undefined', function(assert) {
  assert.equal(h.exist(undefined), false);
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false if null', function(assert) {
  assert.equal(h.exist(null), false);
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be true if array', function(assert) {
  assert.equal(h.exist([]), true);
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false if object', function(assert) {
  assert.equal(h.exist({}), true);
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false if value', function(assert) {
  assert.equal(h.exist(0), true);
  assert.end();
});
