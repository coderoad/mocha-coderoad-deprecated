"use strict";
var utils_1 = require('./utils');
exports = module.exports = reporter;
function reporter(runner) {
    var result = {
        passes: [],
        failures: [],
        failedAt: null
    };
    runner.on('pass', function (test) {
        result.passes.push({
            msg: test.fullTitle(),
            file: test.file
        });
    });
    runner.on('fail', function (test, err) {
        result.failures.push({
            msg: test.fullTitle(),
            file: test.file,
            body: test.body,
            timedOut: test.timedOut,
            duration: test.duration
        });
        result.failedAt = test.file;
    });
    runner.on('end', function () {
        process.stdout.write(utils_1.signal + JSON.stringify(result, null, 2));
    });
}
