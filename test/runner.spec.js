var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var spies = require('chai-spies');

chai.use(spies);
chai.use(chaiAsPromised);
var expect = chai.expect;


var getRunner = require('./utils').getRunner;


describe('runner', function() {

  it('should run to completion', function() {
    var files = [
      ['pass-01.js']
    ];
    var run = getRunner(files);
    return expect(run).to.eventually.be.fulfilled;
  });


  xit('should load environmental variables', function () {
    var spy = chai.spy.on(handleLog);
    var files = [
      ['env-vars.js']
    ];
    var run = getRunner(files);
    return expect(spy).to.have.been.called();
  });

});
