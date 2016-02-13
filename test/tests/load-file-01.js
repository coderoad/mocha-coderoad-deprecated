var expect = require('chai').expect;
var path = require('path');
var loadContext = require('../utils/loadContext').default;
global.data = JSON.parse(JSON.stringify(require('../context/data.json')));
loadContext('./context/array-method.js');

describe('load-file-01', function () {

  it('should pass', function () {
    expect(answer).to.deep.equal([{name: 'A'}]);
  });

});
