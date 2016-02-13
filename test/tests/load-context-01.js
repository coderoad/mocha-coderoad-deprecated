var expect = require('chai').expect;
var loadContext = require('../utils/load-context').default;
loadContext('./context/addOne.js');

describe('load-context-01', function () {

  it('should pass', function () {
    expect(addOne(41)).to.equal(42);
  });

});
