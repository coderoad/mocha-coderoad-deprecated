var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var spies = require('chai-spies');

chai.use(spies);
chai.use(chaiAsPromised);
var expect = chai.expect;

var getRunner = require('./utils/runner').getRunner;

describe('runner', function() {

  it('should run to completion', function() {
    var files = [
      ['pass-01.js']
    ];
    var run = getRunner(files);
    return expect(run).to.eventually.be.fulfilled;
  });


  it('should load environmental variables', function () {
    var files = [
      ['env-vars.js']
    ];
    var run = getRunner(files);
    var expected = {
      pass: true,
      taskPosition: 1,
      failedAtFile: null,
      msg: 'env-vars should pass'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

});
