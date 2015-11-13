'use strict';

var test = require('tape');

var h = require('../../lib/helper');
var moduleName = 'Helper';
var functionName = 'isObject';

test(moduleName + '.' + functionName + '() ' + 'should be true when object', function(assert) {
  assert.ok(h.isObject({
    test: 'Test',
  }));
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be true when empty object', function(assert) {
  assert.ok(h.isObject({}));
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be true when nested object', function(assert) {
  assert.ok(h.isObject({
    object1: {
      test: 'Test',
    },
    object2: {
      test2: 2,
    },
  }));
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false when number', function(assert) {
  assert.notOk(h.isObject(2));
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false when strings', function(assert) {
  assert.notOk(h.isObject('Test'));
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false when function', function(assert) {
  assert.notOk(h.isObject(function test() {}));
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should be false when array', function(assert) {
  assert.notOk(h.isObject([1, 2, 3]));
  assert.end();
});
