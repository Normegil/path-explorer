'use strict';

var h = require('./helper');

module.exports = function get(object, path) {
  var separator = '.';
  var pathElements = path.split(separator);
  if (undefined === object) {
    return undefined;
  } else if (null === object) {
    return null;
  } else if (0 === pathElements.length || '' === pathElements[0]) {
    return object;
  } else if (1 === pathElements.length && '' !== pathElements[0]) {
    if ('' === pathElements[0]) {
      return object;
    } else {
      return getObjectValue(object, pathElements[0]);
    }
  } else {
    var subPathElements = pathElements.splice(1, pathElements.length - 1);
    var objectToSearch = getObjectValue(object, pathElements[0]);
    return get(objectToSearch, subPathElements.join(separator));
  }
};

function getObjectValue(object, key) {
  if (h.isArrayPath(key)) {
    var realKey = h.extractKeyPart(key);
    var indexes = h.extractIndexes(key);
    if (0 !== getWrongIndexes(indexes).length) {
      throw new Error('Wrong path (Empty index): ' + key);
    }
    var toReturn = object[realKey];
    for (var i = 0;i < indexes.length;i++) {
      var index = +indexes[i];
      toReturn = toReturn[index];
    }
    return toReturn;
  } else {
    return object[key];
  }
}

function getWrongIndexes(indexes) {
  return indexes.filter(function filterEmpty(index) {
    return undefined === index || null === index || '' === index;
  });
}
