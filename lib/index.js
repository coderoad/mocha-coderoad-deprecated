"use strict";
var writeTests_1 = require('./writeTests');
var runner_1 = require('./runner');
var testPath_1 = require('./testPath');
function load(_a) {
    var dir = _a.dir, testFile = _a.testFile, tests = _a.tests;
    writeTests_1.default({
        dir: dir,
        tests: tests,
        testPath: testPath_1.default(testFile),
    });
}
exports.load = load;
;
function run(_a) {
    var dir = _a.dir, taskPosition = _a.taskPosition, handleResult = _a.handleResult, testFile = _a.testFile;
    runner_1.default({
        dir: dir,
        taskPosition: taskPosition,
        handleResult: handleResult,
        testPath: testPath_1.default(testFile),
    });
}
exports.run = run;
