var expect = require('chai').expect;
var path = require('path');
var loadContext = require('../utils/loadContext').default;
loadContext('./context/addOne.js');
loadContext('./context/subtractOne.js');
var a = JSON.parse(JSON.stringify(require('../context/data.json'))).a;

describe('load-context-03', function () {

  it('should pass', function () {
    expect(addOne(a)).to.equal(43);
    expect(subtractOne(a)).to.equal(41);
  });

});
