"use strict";
var writeTests_1 = require('./writeTests');
var runner_1 = require('./runner');
var testPath_1 = require('./testPath');
var settings = {
    dir: null,
    tutorial: null,
    tests: '',
    pagePosition: 0,
    testPath: '',
};
function load(options) {
    options.testPath = testPath_1.default(options);
    settings = Object.assign(settings, options);
    writeTests_1.default(options);
}
exports.load = load;
;
function run(_a) {
    var taskPosition = _a.taskPosition, handleResult = _a.handleResult;
    var dir = settings.dir;
    runner_1.default({
        dir: dir,
        taskPosition: taskPosition,
        handleResult: handleResult,
    });
}
exports.run = run;
