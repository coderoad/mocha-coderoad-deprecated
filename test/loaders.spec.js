// var chai = require('chai');
// var chaiAsPromised = require("chai-as-promised");
//
// chai.use(chaiAsPromised);
// var expect = chai.expect;
//
// var getRunner = require('./utils/runner').getRunner;
//
// describe('loaders', function() {
//
//   describe('loadJS', function() {
//     it('should load JS files', function() {
//       var files = [
//         ['loader-js-01.js']
//       ];
//       var run = getRunner(files);
//       var expected = {
//         pass: true,
//         taskPosition: 1,
//         failedAtFile: null,
//         msg: 'loader-js-01 should pass'
//       };
//
//       return expect(run).to.eventually.deep.equal(expected);
//     });
//
//   });
// });
