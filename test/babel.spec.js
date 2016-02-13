var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;

var getRunner = require('./utils/runner').getRunner;

describe('babel', function() {

  it('should load tests written in es6', function() {
    var files = [
      ['./babel-01.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: true,
      taskPosition: 1,
      failedAtFile: null,
      msg: 'babel-01 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

  xit('should compile files before running tests', function() {
    var files = [
      ['./babel-02.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: true,
      taskPosition: 1,
      failedAtFile: null,
      msg: 'babel-02 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

});
