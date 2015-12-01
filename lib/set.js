'use strict';

let h = require('./helper');

let set = module.exports = function set(options, log) {
  return new Promise(function set(resolve, reject) {
    let target = options.target;
    let path = options.path;
    if (!h.exist(options.path)) {
      return reject(new Error('Path doesn\'t exist'));
    }

    // Init target if target is empty
    if (!h.exist(target)) {
      log.debug('Target doesn\'t exist - Creating empty object');
      target = {};
    }

    if ('' === path || '.' === path) {
      log.info({target: target, path: path, value: options.value}, 'Setting value');
      target = options.value;
      return resolve(target);
    } else if (h.isArrayPath(path)) {
      setArrayValue({
        target: target,
        path: path,
        value: options.value,
      }, log).then(resolve)
        .catch(reject);
    } else if (isFinalPathPart(path)) {
      if (!h.isObject(target)) {
        log.trace({previousValue: target},
          'Previous value was not an object - Change value to empty object');
        target = {};
      }
      log.info({target: target, path: path, value: options.value}, 'Setting value');
      target[path] = options.value;
      return resolve(target);
    } else {
      setObjectValue({
        target: target,
        path: path,
        value: options.value,
      }, log).then(resolve)
        .catch(reject);
    }
  });
};

function setArrayValue(options, log) {
  return new Promise(function setArrayValue(resolve, reject) {
    log.trace(options, 'Array path detected');
    let pathElements = options.path.split('.');
    let keyPart = h.extractKeyPart(pathElements[0]);
    let indexes = h.extractIndexes(pathElements[0]);
    let target = options.target;

    if (!Array.isArray(target[keyPart])) {
      log.debug({target: target, key: keyPart},
        'Target was not an array - Overwrite value for empty array');
      target[keyPart] = [];
    }

    let deepestArray = getDeepestArray(target[keyPart], indexes);
    let index = getIndex(deepestArray, indexes[indexes.length - 1]);
    let targetValue = deepestArray[index];
    if (!h.isObject(targetValue) && 1 === pathElements.length) {
      log.info({target: target, path: options.path, value: options.value}, 'Setting value');
      deepestArray[index] = options.value;
      log.trace({target: target, path: options.path, value: options.value}, 'Value setted');
      return resolve(target);
    }
    set({
      target: targetValue,
      path: reducePath(options.path),
      value: options.value,
    }, log).then(function onSuccess(result) {
      log.info({target: target, path: options.path, value: options.value}, 'Setting value');
      deepestArray[index] = result;
      log.trace({target: target, path: options.path, value: options.value}, 'Value setted');
      resolve(target);
    }).catch(reject);
  });
}

function setObjectValue(options, log) {
  return new Promise(function setObjectValue(resolve, reject) {
    let pathElements = options.path.split('.');
    let path = reducePath(options.path);
    let newTarget = options.target[pathElements[0]];
    log.trace({target: newTarget, path: path, value: options.value}, 'Set sub-object value');
    set({
      target: newTarget,
      path: path,
      value: options.value,
    }, log).then(function onValueSetted(result) {
      options.target[pathElements[0]] = result;
      resolve(options.target);
    }).catch(reject);
  });
}

function getDeepestArray(target, indexes) {
  let toReturn = target;
  for (let i = 0;i < indexes.length - 1;i++) {
    let index = getIndex(toReturn, indexes[i]);
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

function isFinalPathPart(path) {
  return path.indexOf('.') < 0;
}

function reducePath(path) {
  let pathElements = path.split('.');
  return pathElements
    .splice(1, pathElements.length - 1)
    .join('.');
}
