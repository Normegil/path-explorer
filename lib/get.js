'use strict';

let h = require('./helper');

module.exports = function get(object, path, log) {
  let separator = '.';
  let pathElements = path.split(separator);
  if (undefined === object) {
    log.info('Target is undefined');
    return undefined;
  } else if (null === object) {
    log.info('Target is null');
    return null;
  } else if (0 === pathElements.length || '' === pathElements[0]) {
    log.info({value: object}, 'Value found');
    return object;
  } else if (1 === pathElements.length) {
    let value = getObjectValue(object, pathElements[0], log);
    log.info({value: value}, 'Value found');
    return value;
  } else {
    let subPathElements = pathElements.splice(1, pathElements.length - 1);
    let newPath = subPathElements.join(separator);
    let objectToSearch = getObjectValue(object, pathElements[0], log);
    log.trace({target: objectToSearch, path: newPath}, 'Search sub object');
    return get(objectToSearch, newPath, log);
  }
};

function getObjectValue(object, key, log) {
  if (h.isArrayPath(key)) {
    log.debug({object: object, key: key}, 'Array key detected');
    let realKey = h.extractKeyPart(key);
    let indexes = h.extractIndexes(key);
    if (0 !== getWrongIndexes(indexes).length) {
      throw new Error('Wrong path (Empty index): ' + key);
    }
    let toReturn = object[realKey];
    log.trace({object: object, objectKey: realKey, indexes: indexes}, 'Indexed parsed');
    for (let i = 0;i < indexes.length;i++) {
      let index = +indexes[i];
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
