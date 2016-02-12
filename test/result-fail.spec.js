var path = require('path');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;

var rootDir = __dirname.split('/');
var config = {
  dir: rootDir.slice(0, rootDir.length - 1).join('/'),
  tutorialDir: path.join(__dirname, 'tests')
};
var getRunner = require('./utils').getRunner;

describe('result-failure', function() {

  it('returns taskPosition 0 if first test fails', function() {
    var files = [
      ['fail-01.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: false,
      taskPosition: 0,
      failedAtFile: path.join(config.tutorialDir, 'fail-01.js'),
      msg: 'fail-01 should fail'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

it('returns taskPosition 1 if second test fails', function() {
  var files = [
    ['pass-01.js'], ['fail-01.js']
  ];
  var run = getRunner(files);
  var expected = {
    pass: false,
    taskPosition: 1,
    failedAtFile: path.join(config.tutorialDir, 'fail-01.js'),
    msg: 'fail-01 should fail'
  };

  return expect(run).to.eventually.deep.equal(expected);
});

it('returns taskPosition 3 if fourth test fails', function() {
  var files = [
    ['pass-01.js'], ['pass-02.js'], ['pass-03.js'], ['fail-01.js']
  ];
  var run = getRunner(files);
  var expected = {
    pass: false,
    taskPosition: 3,
    failedAtFile: path.join(config.tutorialDir, 'fail-01.js'),
    msg: 'fail-01 should fail'
  };

  return expect(run).to.eventually.deep.equal(expected);
});

it('returns taskPosition 0 if any of the first tests fail', function () {
    var files = [
      ['pass-01.js', 'pass-02.js', 'fail-01.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: false,
      taskPosition: 0,
      failedAtFile: path.join(config.tutorialDir, 'fail-01.js'),
      msg: 'fail-01 should fail'
    };

    return expect(run).to.eventually.deep.equal(expected);
});

it('returns the taskPosition at the correct point with arrays of tests', function () {
  var files = [
    ['pass-01.js', 'pass-02.js'], ['pass-03.js'], ['pass-04.js', 'fail-01.js']
  ];
  var run = getRunner(files);
  var expected = {
    pass: false,
    taskPosition: 2,
    failedAtFile: path.join(config.tutorialDir, 'fail-01.js'),
    msg: 'fail-01 should fail'
  };

  return expect(run).to.eventually.deep.equal(expected);
});


});
