'use strict';

var assert = require('chai').assert;
var get = require('../lib/get.js');

describe('get()', function() {
  it('should get root value', function(done) {
    var object = 'Test';
    var value = get(object, '');
    assert.equal(value, object);
    done();
  });

  it('should get undefined for undefined object', function(done) {
    var value = get(undefined, '');
    assert.equal(value, undefined);
    done();
  });

  it('should get undefined if path doesn\'t exist', function(done) {
    var object = {};
    var value = get(object, 'test.test1');
    assert.equal(value, undefined);
    done();
  });

  it('should get null for null object in the path', function(done) {
    var object = {test: null};
    var value = get(object, 'test.test1');
    assert.equal(value, null);
    done();
  });

  it('should be able to get value', function(done) {
    var object = {test: 'test1'};
    var value = get(object, 'test');
    assert.equal(value, object.test);
    done();
  });

  it('should be able to get array', function(done) {
    var object = {test: [1,2,3]};
    var value = get(object, 'test');
    assert.equal(value, object.test);
    done();
  });

  it('should be able to get object', function(done) {
    var object = {test: {test1: 1, test2: 'test2'}};
    var value = get(object, 'test');
    assert.equal(value, object.test);
    done();
  });

  it('should be able to get deep value', function(done) {
    var object = {test: {test1: {test2: {test3: 'test3'}}}};
    var value = get(object, 'test.test1.test2.test3');
    assert.equal(value, object.test.test1.test2.test3);
    done();
  });

  it('should be able to get previous value if end with \'.\' notation', function(done) {
    var object = {test: {test1: 'Test'}};
    var value = get(object, 'test.test1.');
    assert.equal(value, object.test.test1);
    done();
  });

  it('should be able to get deep value behind array', function(done) {
    var object = {test: [
      {testX: 'test1',},
      {testX: 'test2',},
    ],};
    var value = get(object, 'test[1].testX');
    assert.equal(value, object.test[1].testX);
    done();
  });

  it('should be able to get deep value behind multiple dimension array', function(done) {
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
    done();
  });

  it('should send error if path as an empty array', function(done) {
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
      done(new Error('Should have throw an error'));
    } catch (err) {
      return done();
    }
  });
});
