'use strict';

var assert = require('chai').assert;
var set = require('../lib/set.js');

describe('set()', function() {
  it('should send an error if path is null', function(done) {
    var target = {};
    set(
      {
        target: target,
        path: null,
        value: 'test',
      },
      function(err) {
        if (err) {return done();}
        return done(new Error('didn \'t send an error as expected'));
      });
  });

  it('should send an error if path is undefined', function(done) {
    var target = {};
    set(
      {
        target: target,
        value: 'test',
      },
      function(err) {
        if (err) {return done();}
        return done(new Error('didn \'t send an error as expected'));
      });
  });

  it('should not send an error if target is undefined', function(done) {
    var target;
    set(
      {
        target: target,
        path: '',
        value: 'test',
      },
      function(err, result) {
        if (err) {return done(err);}
        assert.equal(result, 'test');
        return done();
      });
  });

  it('should not send an error if target is null', function(done) {
    var target = null;
    set(
      {
        target: target,
        path: '',
        value: 'test',
      },
      function(err, result) {
        if (err) {return done(err);}
        assert.equal(result, 'test');
        return done();
      });
  });

  it('should set root value', function(done) {
    var target = {};
    set(
      {
        target: target,
        path: '',
        value: 'test',
      },
      function(err, result) {
        if (err) {return done();}
        assert.equal(result, 'test');
        return done();
      });
  });

  it('should set root value of undefined target', function(done) {
    var target;
    set(
      {
        target: target,
        path: 'testField',
        value: 'test',
      },
      function(err, result) {
        if (err) {return done();}
        assert.equal(result.testField, 'test');
        return done();
      });
  });

  it('should set root value of null target', function(done) {
    var target = null;
    set(
      {
        target: target,
        path: 'testField',
        value: 'test',
      },
      function(err, result) {
        if (err) {return done();}
        assert.equal(result.testField, 'test');
        return done();
      });
  });

  it('should set property value', function(done) {
    var target = {};
    set(
      {
        target: target,
        path: 'testProperty',
        value: 'test',
      },
      function(err) {
        if (err) {return done();}
        assert.equal(target.testProperty, 'test');
        return done();
      });
  });

  it('should set property value in hierarchy', function(done) {
    var target = {object: {}};
    set(
      {
        target: target,
        path: 'object.testProperty',
        value: 'test',
      },
      function(err) {
        if (err) {return done();}
        assert.equal(target.object.testProperty, 'test');
        return done();
      });
  });

  it('should not change other values', function(done) {
    var target = {
      test1: 'test1',
      test2: 'test2',
    };
    set(
      {
        target: target,
        path: 'test1',
        value: 'test',
      },
      function(err) {
        if (err) {return done();}
        assert.equal(target.test1, 'test');
        assert.equal(target.test2, 'test2');
        return done();
      });
  });

  it('should set property value in non-existing hierarchy', function(done) {
    var target = {};
    set(
      {
        target: target,
        path: 'object.testProperty',
        value: 'test',
      },
      function(err) {
        if (err) {return done();}
        assert.equal(target.object.testProperty, 'test');
        return done();
      });
  });

  it('should set array as property value', function(done) {
    var target = {};
    var value = [1, 2, 3];
    set(
      {
        target: target,
        path: 'array',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(target.array, value);
        return done();
      });
  });

  it('should set value for composed property name', function(done) {
    var target = {};
    var value = 'Test';
    var propertyName = 'Test Object';
    set(
      {
        target: target,
        path: propertyName,
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(target[propertyName], value);
        return done();
      });
  });

  it('should replace internal value of an array', function(done) {
    var target = {array: [1 ,2 ,3]};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[1]',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(target.array[1], value);
        return done();
      }
    );
  });

  it('should be able to set an internal array value', function(done) {
    var target = {array: [1 ,2 ,3]};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[1].test',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(target.array[1].test, value);
        return done();
      }
    );
  });

  it('should send an error when setting an internal array value if array index doesn\'t exist', function(done) {
    var target = {array: [1 ,2 ,3]};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[42].test',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(value, target.array[42].test);
        done();
      }
    );
  });

  it('should be able to add an internal array value if no index is specified', function(done) {
    var target = {array: [1 ,2 ,3]};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[].test',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(target.array[3].test, value);
        return done();
      }
    );
  });

  it('should be able to set an internal array value if array index exist on multiple dimension array', function(done) {
    var target = {array: [[1, 2, 3], [21, 22, 23], [31, 32, 33]]};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[1][2].test',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(target.array[1][2].test, value);
        return done();
      }
    );
  });

  it('should be able to replace base property with an array', function(done) {
    var target = {array: 'Test'};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[1].test',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(value, target.array[1].test);
        return done();
      }
    );
  });

  it('should be able to set an internal array to replace actual value', function(done) {
    var target = {array: [1, 2, 3]};
    var value = 4;
    set(
      {
        target: target,
        path: 'array[1][2].test',
        value: value,
      },
      function(err) {
        if (err) {return done(err);}
        assert.equal(value, target.array[1][2].test);
        return done();
      }
    );
  });
});
