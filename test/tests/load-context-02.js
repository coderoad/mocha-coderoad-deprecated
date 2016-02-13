var expect = require('chai').expect;
var path = require('path');
var loadContext = require('../utils/load-context').default;
loadContext('./context/addOne.js');
loadContext('./context/subtractOne.js');

describe('load-context-02', function () {

  it('should pass', function () {
    expect(addOne(41)).to.equal(42);
    expect(subtractOne(43)).to.equal(42);
  });

});
