'use strict';

var test = require('tape');
var set = require('../lib/set.js');

var moduleName = 'set() ';
test(moduleName + 'should send an error if path is null', function(assert) {
  var target = {};
  set(
    {
      target: target,
      path: null,
      value: 'test',
    },
    function(err) {
      if (err) {return assert.end();}
      return assert.fail(new Error('didn \'t send an error as expected'));
    });
});

test(moduleName + 'should send an error if path is undefined', function(assert) {
  var target = {};
  set(
    {
      target: target,
      value: 'test',
    },
    function(err) {
      if (err) {return assert.end();}
      return assert.fail(new Error('didn \'t send an error as expected'));
    });
});

test(moduleName + 'should not send an error if target is undefined', function(assert) {
  var target;
  set(
    {
      target: target,
      path: '',
      value: 'test',
    },
    function(err, result) {
      if (err) {return assert.fail(err);}
      assert.equal(result, 'test');
      return assert.end();
    });
});

test(moduleName + 'should not send an error if target is null', function(assert) {
  var target = null;
  set(
    {
      target: target,
      path: '',
      value: 'test',
    },
    function(err, result) {
      if (err) {return assert.fail(err);}
      assert.equal(result, 'test');
      return assert.end();
    });
});

test(moduleName + 'should set root value', function(assert) {
  var target = {};
  set(
    {
      target: target,
      path: '',
      value: 'test',
    },
    function(err, result) {
      if (err) {return assert.end();}
      assert.equal(result, 'test');
      return assert.end();
    });
});

test(moduleName + 'should set root value of undefined target', function(assert) {
  var target;
  set(
    {
      target: target,
      path: 'testField',
      value: 'test',
    },
    function(err, result) {
      if (err) {return assert.end();}
      assert.equal(result.testField, 'test');
      return assert.end();
    });
});

test(moduleName + 'should set root value of null target', function(assert) {
  var target = null;
  set(
    {
      target: target,
      path: 'testField',
      value: 'test',
    },
    function(err, result) {
      if (err) {return assert.end();}
      assert.equal(result.testField, 'test');
      return assert.end();
    });
});

test(moduleName + 'should set property value', function(assert) {
  var target = {};
  set(
    {
      target: target,
      path: 'testProperty',
      value: 'test',
    },
    function(err) {
      if (err) {return assert.end();}
      assert.equal(target.testProperty, 'test');
      return assert.end();
    });
});

test(moduleName + 'should set property value in hierarchy', function(assert) {
  var target = {object: {}};
  set(
    {
      target: target,
      path: 'object.testProperty',
      value: 'test',
    },
    function(err) {
      if (err) {return assert.end();}
      assert.equal(target.object.testProperty, 'test');
      return assert.end();
    });
});

test(moduleName + 'should not change other values', function(assert) {
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
      if (err) {return assert.end();}
      assert.equal(target.test1, 'test');
      assert.equal(target.test2, 'test2');
      return assert.end();
    });
});

test(moduleName + 'should set property value in non-existing hierarchy', function(assert) {
  var target = {};
  set(
    {
      target: target,
      path: 'object.testProperty',
      value: 'test',
    },
    function(err) {
      if (err) {return assert.end();}
      assert.equal(target.object.testProperty, 'test');
      return assert.end();
    });
});

test(moduleName + 'should set array as property value', function(assert) {
  var target = {};
  var value = [1, 2, 3];
  set(
    {
      target: target,
      path: 'array',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(target.array, value);
      return assert.end();
    });
});

test(moduleName + 'should set value for composed property name', function(assert) {
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
      if (err) {return assert.fail(err);}
      assert.equal(target[propertyName], value);
      return assert.end();
    });
});

test(moduleName + 'should replace internal value of an array', function(assert) {
  var target = {array: [1 ,2 ,3]};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[1]',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(target.array[1], value);
      return assert.end();
    }
  );
});

test(moduleName + 'should be able to set an internal array value', function(assert) {
  var target = {array: [1 ,2 ,3]};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[1].test',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(target.array[1].test, value);
      return assert.end();
    }
  );
});

test(moduleName + 'should send an error when setting an internal array value if array index doesn\'t exist', function(assert) {
  var target = {array: [1 ,2 ,3]};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[42].test',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(value, target.array[42].test);
      assert.end();
    }
  );
});

test(moduleName + 'should be able to add an internal array value if no index is specified', function(assert) {
  var target = {array: [1 ,2 ,3]};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[].test',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(target.array[3].test, value);
      return assert.end();
    }
  );
});

test(moduleName + 'should be able to set an internal array value if array index exist on multiple dimension array', function(assert) {
  var target = {array: [[1, 2, 3], [21, 22, 23], [31, 32, 33]]};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[1][2].test',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(target.array[1][2].test, value);
      return assert.end();
    }
  );
});

test(moduleName + 'should be able to replace base property with an array', function(assert) {
  var target = {array: 'Test'};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[1].test',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(value, target.array[1].test);
      return assert.end();
    }
  );
});

test(moduleName + 'should be able to set an internal array to replace actual value', function(assert) {
  var target = {array: [1, 2, 3]};
  var value = 4;
  set(
    {
      target: target,
      path: 'array[1][2].test',
      value: value,
    },
    function(err) {
      if (err) {return assert.fail(err);}
      assert.equal(value, target.array[1][2].test);
      return assert.end();
    }
  );
});
