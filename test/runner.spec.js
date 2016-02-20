var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;
var path = require('path');

var getRunner = require('./utils/runner').getRunner;

describe('runner', function() {

  it('should run to completion', function() {
    var file = path.join(__dirname, 'tests', 'pass-01.js');
    var run = getRunner(file);
    return expect(run).to.eventually.be.fulfilled;
  });

  it('should load environmental variables', function () {
    var file = path.join(__dirname, 'tests', 'env-vars.js');
    var run = getRunner(file);
    var expected = {
      taskPosition: 1,
      msg: 'Task 1 Complete'
    };

    return expect(run).to.eventually.deep.equal(expected);
  });

});
