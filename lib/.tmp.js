
'use strict';
const util = require('util');

function getType(output) {
  switch (Object.prototype.toString.call(output)) {
    case '[object Array]':
      return 'array';
    case '[object Date]':
      return 'date';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      // NaN !== NaN
      return (output !== output) ? 'NaN' : 'number';
  }
  return typeof output;
}
const inspectOptions = {
  depth: null
};
function assignTypes(args) {
  return JSON.stringify(
    args.map((output) => {
      const type = getType(output);
      switch (type) {
        case 'object':
        case 'array':
          output = JSON.stringify(output);
          output = util.inspect(output, inspectOptions);
          output = output.substring(1, output.length - 1);
          break;
        case 'undefined':
        case 'null':
        case 'NaN':
          return { type };
      }
      return { type, output };
    })
  );
}

if (console && console.log) {
  const originalLog = console.log;
  console.log = (...args) => {
     var stack = new Error().stack;
     debugger;
    setTimeout(originalLog.apply(this, [assignTypes(args)], null));
  };
};
var expect = require('chai').expect;

global.something = {
  some: 'data'
};

// addOne
function addOne(x) {
	return x + 1;
}

// subtractOne
function subtractOne(x) {
	return x - 1
}

console.log({
	a: 1
}, 2)


describe('01 addOne', function() {

	it('doesn\'t exist', function() {
		expect(addOne).to.be.defined;
	});

	it('should take a parameter', function() {
		expect(addOne).to.have.length(1);
	});

	it('doesn\'t return anything', function() {
		expect(addOne(1)).to.exist;
	});

	it('should output a number', function() {
		expect(addOne(1)).to.be.a('number');
	});

	it('doesn\'t add 1 + 1', function() {
		expect(addOne(1)).to.equal(2);
		expect(addOne(10)).to.equal(11);
	});

});

describe('02 subtractOne', function() {

  it('doesn\'t exist', function () {
    expect(subtractOne).to.be.defined;
  });

  it('should take a parameter', function() {
    expect(subtractOne).to.have.length(1);
  });

  it('should output a number', function () {
    expect(subtractOne(1)).to.be.a('number');
  });

  it('doesn\'t subtract 1', function() {
    expect(subtractOne(1)).to.equal(0);
    expect(subtractOne(10)).to.equal(9);
  });

});

