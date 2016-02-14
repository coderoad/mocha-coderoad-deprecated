var expect = require('chai').expect;
var loadContext = require('../utils/load-context').default;
loadContext('./context/babel.js');

describe('babel-02', function () {

  it('should pass', function () {
    expect(stringList).to.equal('40 + 2 = 42');
  });

});
