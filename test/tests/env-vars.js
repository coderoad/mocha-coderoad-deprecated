var expect = require('chai').expect;

describe('01 env-vars', function () {

  it('should pass', function () {
    expect(process.env.DIR).to.be.a('string');
    expect(process.env.TUTORIAL_DIR).to.be.a('string');
  });

});
