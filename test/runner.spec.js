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

xdescribe('runner', function() {

  it('should run to completion', function() {
    var files = [
      ['pass-01.js']
    ];
    var run = runner(files, config, handleResult, handleLog);
    expect(run).to.eventually.be.fulfilled;
  });


  it('should load environmental variables', function () {
    var files = [
      ['env-vars.js']
    ];
    var run = runner(files, config, handleResult, handleLog);
    expect(run).to.eventually.equal(Promise.resolve('hi'));
  });

});
