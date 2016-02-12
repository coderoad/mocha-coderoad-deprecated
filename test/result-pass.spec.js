var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var runner = require('../src/runner').runner;
var rootDir = __dirname.split('/');
var config = {
  dir: rootDir.slice(0, rootDir.length - 1).join('/'),
  tutorialDir: __dirname + '/tests'
};
var handleLog = function(log) {
  return log;
};
var handleResult = function(result) {
  return result;
};

describe('result-pass', function() {

  it('should take one passing test and return taskPosition 1', function() {
    var files = [
      ['./pass-01.js']
    ];
    var run = runner(files, config, handleResult, handleLog);
    var expected = {
      pass: true,
      taskPosition: 1,
      failedAtFile: null,
      msg: 'pass-01 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

  it('should take three passing tests and return taskPosition 3', function () {
    var files = [
      ['./pass-01.js'], ['./pass-02.js'], ['./pass-03.js']
    ];
    var run = runner(files, config, handleResult, handleLog);
    var expected = {
      pass: true,
      taskPosition: 3,
      failedAtFile: null,
      msg: 'pass-03 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

  it('should take two arrays of two passing tests and still return taskPosition 2', function () {
    var files = [
      ['./pass-01.js', './pass-02.js'], ['./pass-03.js', './pass-04.js']
    ];
    var run = runner(files, config, handleResult, handleLog);
    var expected = {
      pass: true,
      taskPosition: 2,
      failedAtFile: null,
      msg: 'pass-04 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

});
