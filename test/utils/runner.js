var path = require('path');

var runner = require('../../src/runner').default;
var rootDir = __dirname.split('/');
var config = {
  dir: rootDir.slice(0, rootDir.length - 1).join('/'),
  tutorialDir: path.join(__dirname, '..', '/tests'),
  taskPosition: 0
};
function handleLog(log) {
  return log;
}
function handleResult(result) {
  return result;
}

exports.getRunner = function getRunner(file) {
  return runner(file, config, handleResult, handleLog);
}
