/// coderoad-test-file




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

