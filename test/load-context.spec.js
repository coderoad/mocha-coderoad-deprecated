var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;

var getRunner = require('./utils/runner').getRunner;

describe('loadContext', function() {

  it('should load another files context', function() {
    var files = [
      ['load-context-01.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: true,
      taskPosition: 1,
      failedAtFile: null,
      msg: 'load-context-01 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

  it('should load multiple file contexts', function() {
    var files = [
      ['load-context-02.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: true,
      taskPosition: 1,
      failedAtFile: null,
      msg: 'load-context-02 should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

    it('should allowing requiring files', function() {
      var files = [
        ['load-context-03.js']
      ];
      var run = getRunner(files);
      var expected = {
        pass: true,
        taskPosition: 1,
        failedAtFile: null,
        msg: 'load-context-03 should pass'
      };

      return expect(run).to.eventually.deep.equal(expected);
    });

});
