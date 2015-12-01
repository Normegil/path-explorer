'use strict';

var test = require('tape');
var get = require('../').get;

var moduleName = 'get() ';
test(moduleName + 'should get root value', function(assert) {
  var object = 'Test';
  var value = get(object, '');
  assert.equal(value, object);
  assert.end();
});

test(moduleName + 'should get undefined for undefined object', function(assert) {
  var value = get(undefined, '');
  assert.equal(value, undefined);
  assert.end();
});

test(moduleName + 'should get undefined if path doesn\'t exist', function(assert) {
  var object = {};
  var value = get(object, 'test.test1');
  assert.equal(value, undefined);
  assert.end();
});

test(moduleName + 'should get null for null object in the path', function(assert) {
  var object = {test: null};
  var value = get(object, 'test.test1');
  assert.equal(value, null);
  assert.end();
});

test(moduleName + 'should be able to get value', function(assert) {
  var object = {test: 'test1'};
  var value = get(object, 'test');
  assert.equal(value, object.test);
  assert.end();
});

test(moduleName + 'should be able to get array', function(assert) {
  var object = {test: [1,2,3]};
  var value = get(object, 'test');
  assert.equal(value, object.test);
  assert.end();
});

test(moduleName + 'should be able to get object', function(assert) {
  var object = {test: {test1: 1, test2: 'test2'}};
  var value = get(object, 'test');
  assert.equal(value, object.test);
  assert.end();
});

test(moduleName + 'should be able to get deep value', function(assert) {
  var object = {test: {test1: {test2: {test3: 'test3'}}}};
  var value = get(object, 'test.test1.test2.test3');
  assert.equal(value, object.test.test1.test2.test3);
  assert.end();
});

test(moduleName + 'should be able to get previous value if end with \'.\' notation', function(assert) {
  var object = {test: {test1: 'Test'}};
  var value = get(object, 'test.test1.');
  assert.equal(value, object.test.test1);
  assert.end();
});

test(moduleName + 'should be able to get deep value behind array', function(assert) {
  var object = {test: [
    {testX: 'test1',},
    {testX: 'test2',},
  ],};
  var value = get(object, 'test[1].testX');
  assert.equal(value, object.test[1].testX);
  assert.end();
});

test(moduleName + 'should be able to get deep value behind multiple dimension array', function(assert) {
  var object = {
    test: [
      [
        {testX: 'test1',},
        {testX: 'test2',},
      ],
      [
        {testX: 'test3',},
        {testX: 'test4',},
      ],
    ],
  };
  var value = get(object, 'test[1][0].testX');
  assert.equal(value, object.test[1][0].testX);
  assert.end();
});

test(moduleName + 'should send error if path as an empty array', function(assert) {
  var object = {
    test: [
      [
        {testX: 'test1',},
        {testX: 'test2',},
      ],
    ],
  };
  try {
    /* jshint unused: false */
    var value = get(object, 'test[1][].testX');
    assert.fail(new Error('Should have throw an error'));
  } catch (err) {
    return assert.end();
  }
});
