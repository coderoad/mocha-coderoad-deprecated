var expect = require('chai').expect;

describe('babel-01', function () {

  const a = 40;
  let b = 2;
  var stringLit = `${a} + ${b} = ${a + b}`;
  console.log(stringList);

  it('should pass', function () {
    expect(stringList).to.equal('40 + 2 = 42');
  });

});
