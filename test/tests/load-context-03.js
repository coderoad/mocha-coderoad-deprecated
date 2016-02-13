var expect = require('chai').expect;
var path = require('path');
var loadContext = require('../utils/load-context').default;
loadContext('./context/addOne.js');
loadContext('./context/subtractOne.js');
var a = JSON.parse(JSON.stringify(require('../context/data.json')));

describe('load-context-03', function () {

  it('should pass', function () {
    expect(a[0]).to.deep.equal({name: 'A'});
  });

});
