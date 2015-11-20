'use strict';

var test = require('tape');

var h = require('../../lib/helper');
var moduleName = 'Helper';
var functionName = 'extractKeyPart';
test(moduleName + '.' + functionName + '() ' + 'should get full key if no array specified', function(assert) {
  assert.equal(h.extractKeyPart('test1'), 'test1');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get key part when array defined but no index', function(assert) {
  assert.equal(h.extractKeyPart('test[]'), 'test');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get key part when array defined', function(assert) {
  assert.equal(h.extractKeyPart('test[1]'), 'test');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get first part if array in the middle of the key', function(assert) {
  assert.equal(h.extractKeyPart('tes[1]t'), 'tes');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get full key if no array specified - Capitals', function(assert) {
  assert.equal(h.extractKeyPart('TEST1'), 'TEST1');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get key part when array defined but no index - Capitals', function(assert) {
  assert.equal(h.extractKeyPart('TEST[]'), 'TEST');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get key part when array defined - Capitals', function(assert) {
  assert.equal(h.extractKeyPart('TEST[1]'), 'TEST');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get first part if array in the middle of the key - Capitals', function(assert) {
  assert.equal(h.extractKeyPart('TES[1]T'), 'TES');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get full key if no array specified - Numbers', function(assert) {
  assert.equal(h.extractKeyPart('123'), '123');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get key part when array defined but no index - Numbers', function(assert) {
  assert.equal(h.extractKeyPart('123[]'), '123');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get key part when array defined - Numbers', function(assert) {
  assert.equal(h.extractKeyPart('123[42]'), '123');
  assert.end();
});

test(moduleName + '.' + functionName + '() ' + 'should get first part if array in the middle of the key - Numbers', function(assert) {
  assert.equal(h.extractKeyPart('12[4]3'), '12');
  assert.end();
});
