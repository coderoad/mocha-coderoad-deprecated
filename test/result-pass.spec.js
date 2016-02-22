"use strict";
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var concatTests = require('./utils/concat-tests').concatTests;

var getRunner = require('./utils/runner').getRunner;

describe('result-pass', function() {

  it('should take one passing test and return taskPosition 1', function() {
    var file = path.join(__dirname, 'tests', 'pass-01.js');
    var run = getRunner(file);
    var expected = {
      change: 1,
      pass: true,
      taskPosition: 1,
      msg: 'Task 1 Complete'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

  it('should take three passing tests and return taskPosition 3', function () {
    let tests = ['./tests/pass-01.js', './tests/pass-02.js', './tests/pass-03.js'];
    tests = tests.map(function(test) {
      return path.join(__dirname, test);
    })
    var file = concatTests(path.join(__dirname, 'temp', 'pass02.js'), tests);
    var run = getRunner(file);
    var expected = {
      change: 3,
      pass: true,
      taskPosition: 3,
      msg: 'Task 3 Complete'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

});
