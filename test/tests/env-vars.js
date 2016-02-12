var expect = require('chai').expect;

describe('pass-01', function () {

  console.log(process.env.DIR);
  console.log(process.env.TUTORIAL_DIR);

  it('should pass', function () {
    expect(true).to.be.true;
  });

});
