'use strict';

let test = require('tape');
let set = require('../').set;

let moduleName = 'set() ';
test(moduleName + 'should send an error if path is null', function(assert) {
  let target = {};
  set({
    target: target,
    path: null,
    value: 'test',
  }).then(function onSuccess() {
    assert.fail(new Error('didn \'t send an error as expected'));
    assert.end();
  }).catch(function onError() {
    assert.end();
  });
});

test(moduleName + 'should send an error if path is undefined', function(assert) {
  let target = {};
  set({
      target: target,
      value: 'test',
    }).then(function onSuccess() {
      assert.fail(new Error('didn \'t send an error as expected'));
      assert.end();
    }).catch(function onError() {
      assert.end();
    });
});

test(moduleName + 'should not send an error if target is undefined', function(assert) {
  let target;
  set({
    target: target,
    path: '',
    value: 'test',
  }).then(function onSuccess(result) {
    assert.equal(result, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should not send an error if target is null', function(assert) {
  let target = null;
  set({
    target: target,
    path: '',
    value: 'test',
  }).then(function onSuccess(result) {
    assert.equal(result, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set root value', function(assert) {
  let target = {};
  set({
    target: target,
    path: '',
    value: 'test',
  }).then(function onSuccess(result) {
    assert.equal(result, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set root value of undefined target', function(assert) {
  let target;
  set({
    target: target,
    path: 'testField',
    value: 'test',
  }).then(function onSuccess(result) {
    assert.equal(result.testField, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set root value of null target', function(assert) {
  let target = null;
  set({
    target: target,
    path: 'testField',
    value: 'test',
  }).then(function onSuccess(result) {
    assert.equal(result.testField, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set property value', function(assert) {
  let target = {};
  set({
    target: target,
    path: 'testProperty',
    value: 'test',
  }).then(function onSuccess() {
    assert.equal(target.testProperty, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set property value in hierarchy', function(assert) {
  let target = {object: {}};
  set({
    target: target,
    path: 'object.testProperty',
    value: 'test',
  }).then(function onSuccess() {
    assert.equal(target.object.testProperty, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should not change other values', function(assert) {
  let target = {
    test1: 'test1',
    test2: 'test2',
  };
  set({
    target: target,
    path: 'test1',
    value: 'test',
  }).then(function onSuccess() {
    assert.equal(target.test1, 'test');
    assert.equal(target.test2, 'test2');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set property value in non-existing hierarchy', function(assert) {
  let target = {};
  set({
    target: target,
    path: 'object.testProperty',
    value: 'test',
  }).then(function onSuccess() {
    assert.equal(target.object.testProperty, 'test');
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set array as property value', function(assert) {
  let target = {};
  let value = [1, 2, 3];
  set({
    target: target,
    path: 'array',
    value: value,
  }).then(function onSuccess() {
    assert.equal(target.array, value);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should set value for composed property name', function(assert) {
  let target = {};
  let value = 'Test';
  let propertyName = 'Test Object';
  set({
    target: target,
    path: propertyName,
    value: value,
  }).then(function onSuccess() {
    assert.equal(target[propertyName], value);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should replace internal value of an array', function(assert) {
  let target = {array: [1 ,2 ,3]};
  let value = 4;
  set({
    target: target,
    path: 'array[1]',
    value: value,
  }).then(function onSuccess() {
    assert.equal(target.array[1], value);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should be able to set an internal array value', function(assert) {
  let target = {array: [1 ,2 ,3]};
  let value = 4;
  set({
    target: target,
    path: 'array[1].test',
    value: value,
  }).then(function onSuccess() {
    assert.equal(target.array[1].test, value);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should send an error when setting an internal array value if array index doesn\'t exist', function(assert) {
  let target = {array: [1 ,2 ,3]};
  let value = 4;
  set({
    target: target,
    path: 'array[42].test',
    value: value,
  }).then(function onSuccess() {
    assert.equal(value, target.array[42].test);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should be able to add an internal array value if no index is specified', function(assert) {
  let target = {array: [1 ,2 ,3]};
  let value = 4;
  set({
    target: target,
    path: 'array[].test',
    value: value,
  }).then(function onSuccess() {
    assert.equal(target.array[3].test, value);
    assert.end();
  }).catch(function onError(err) {
    assert.fail(err);
    assert.end();
  });
});

test(moduleName + 'should be able to set an internal array value if array index exist on multiple dimension array', function(assert) {
  let target = {array: [[1, 2, 3], [21, 22, 23], [31, 32, 33]]};
  let value = 4;
  set({
    target: target,
    path: 'array[1][2].test',
    value: value,
  }).then(function onSuccess() {
    assert.equal(target.array[1][2].test, value);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should be able to replace base property with an array', function(assert) {
  let target = {array: 'Test'};
  let value = 4;
  set({
    target: target,
    path: 'array[1].test',
    value: value,
  }).then(function onSuccess() {
    assert.equal(value, target.array[1].test);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'should be able to set an internal array to replace actual value', function(assert) {
  let target = {array: [1, 2, 3]};
  let value = 4;
  set({
    target: target,
    path: 'array[1][2].test',
    value: value,
  }).then(function onSuccess() {
    assert.equal(value, target.array[1][2].test);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'works with deep object', function(assert) {
  let target = {};
  let value = 'testValue';
  set({
    target: target,
    path: 'test.test1.test2.test3',
    value: value,
  }).then(function onSuccess(result) {
    assert.equal(value, result.test.test1.test2.test3);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});

test(moduleName + 'works with deep object containing array', function(assert) {
  let target = {};
  let value = 'testValue';
  set({
    target: target,
    path: 'test.test1[0][1].test2.test3',
    value: value,
  }).then(function onSuccess(result) {
    assert.equal(value, result.test.test1[0][1].test2.test3);
    assert.end();
  }).catch(function onError(err) {
    assert.end(err);
  });
});
