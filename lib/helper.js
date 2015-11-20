'use strict';

var _ = require('lodash');

module.exports.exist = function exist(value) {
  return undefined !== value && null !== value;
};

module.exports.isObject = function isObject(toTest) {
  return _.isObject(toTest) &&
    !_.isFunction(toTest) &&
    !Array.isArray(toTest) &&
    null !== toTest &&
    undefined !== toTest;
};

module.exports.extractIndexes = function extractIndexes(path) {
  var regex = /\[(-?[0-9]*)\]/g;
  var matches = [];
  var match;
  while (null !== (match = regex.exec(path))) {
    matches.push(match[1]);
  }
  return matches;
};

module.exports.extractKeyPart = function extractKeyPart(path) {
  var regex = /^[a-z0-9]+/i;
  return regex.exec(path)[0];
};

module.exports.isArrayPath = function isArrayPath(path) {
  var regex = /.*\[[0-9]*\]$/i;
  var pathElements = path.split('.');
  return pathElements[0].match(regex);
};
