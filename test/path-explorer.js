'use strict';

var assert = require('chai').assert;
var pathExplorer = require('../index.js');

describe('path-explorer', function() {
  it('should require get.js for the getter', function(done) {
    assert.equal(pathExplorer.get, require('../lib/get.js'));
    done();
  });

  it('should require set.js for the setter', function(done) {
    assert.equal(pathExplorer.set, require('../lib/set.js'));
    done();
  });
});
