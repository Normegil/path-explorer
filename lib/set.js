'use strict';

var h = require('./helper');

var set = module.exports = function set(options, callback) {
  var target = options.target;
  var path = options.path;
  if (!h.exist(options.path)) {
    return callback(new Error('Path doesn\'t exist'));
  }

  // Init target if target is empty
  if (!h.exist(target)) {
    target = {};
  }

  if ('' === path || '.' === path) {
    target = options.value;
    return callback(null, target);
  } else if (h.isArrayPath(path)) {
    setArrayValue(options, callback);
  } else if (isFinalPathPart(path)) {
    if (!h.isObject(target)) {
      target = {};
    }
    target[path] = options.value;
    return callback(null, target);
  } else {
    setObjectValue(options, callback);
  }
};

function setArrayValue(options, callback) {
  var pathElements = options.path.split('.');
  var keyPart = h.extractKeyPart(pathElements[0]);
  var indexes = h.extractIndexes(pathElements[0]);

  if (!Array.isArray(options.target[keyPart])) {
    options.target[keyPart] = [];
  }

  var deepestArray = getDeepestArray(options.target[keyPart], indexes);
  var index = getIndex(deepestArray, indexes[indexes.length - 1]);
  var targetValue = deepestArray[index];
  if (!h.isObject(targetValue) && 1 === pathElements.length) {
    deepestArray[index] = options.value;
    return callback(null, options.target);
  }
  set(
    {
      target: targetValue,
      path: reducePath(options.path),
      value: options.value,
    },
    function onValueSetted(err, result) {
      deepestArray[index] = result;
      return callback(err, options.target);
    });
}

function getDeepestArray(target, indexes) {
  var toReturn = target;
  for (var i = 0;i < indexes.length - 1;i++) {
    var index = getIndex(toReturn, indexes[i]);
    if (!Array.isArray(toReturn[index])) {
      toReturn[index] = [];
    }
    toReturn = toReturn[index];
  }
  return toReturn;
}

function getIndex(toReturn, actualIndex) {
  if ('' === actualIndex) {
    toReturn.push([]);
    return toReturn.length - 1;
  } else {
    return actualIndex;
  }
}

function setObjectValue(options, callback) {
  var pathElements = options.path.split('.');
  var newTarget = options.target[pathElements[0]];
  set(
    {
      target: newTarget,
      path: reducePath(options.path),
      value: options.value,
    },
    function onValueSetted(err, result) {
      options.target[pathElements[0]] = result;
      return callback(err, options.target);
    });
}

function isFinalPathPart(path) {
  return path.indexOf('.') < 0;
}

function reducePath(path) {
  var pathElements = path.split('.');
  return pathElements
    .splice(1, pathElements.length - 1)
    .join('.');
}
