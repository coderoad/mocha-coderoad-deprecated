var expect = require('chai').expect;
var loadJS = require('../utils/loadContext').default;
loadJS('./context/addOne.js');

describe('loader-js-01', function () {

  it('should pass', function () {
    expect(addOne(41)).to.equal(42);
  });

});
