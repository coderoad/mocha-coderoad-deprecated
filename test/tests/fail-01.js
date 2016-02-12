var expect = require('chai').expect;

describe('fail-01', function () {

  it('should fail', function () {
    expect(true).to.be.false;
  });

});
