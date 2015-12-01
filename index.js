'use strict';

let logWrapper = require('log-wrapper');
let get = require('./lib/get.js');
let set = require('./lib/set.js');

let log = logWrapper(undefined);
module.exports.registerLogger = function registerLogger(logger) {
  log = logWrapper(logger);
};

module.exports.get = function getWithLog(object, path) {
  log.info({target: object, path: path}, 'Get value');
  return get(object, path, log);
};
module.exports.set = function setWithLog(options) {
  log.info({target: options.target, path: options.path, value: options.value}, 'Set value');
  return set(options, log);
};
