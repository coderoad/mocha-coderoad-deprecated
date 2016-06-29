"use strict";
var constants_1 = require('./constants');
exports = module.exports = reporter;
function reporter(runner) {
    var result = {
        passes: [],
        failures: [],
        pass: true,
    };
    runner.on('pass', function (test) {
        var index = getIndexAndTitle(test.fullTitle()).index;
        result.passes.push({
            msg: "Task " + index + " Complete",
            taskPosition: index,
        });
    });
    runner.on('fail', function (test, err) {
        var _a = getIndexAndTitle(test.fullTitle()), msg = _a.msg, index = _a.index;
        result.failures.push({
            msg: msg,
            taskPosition: index - 1,
            timedOut: test.timedOut,
        });
        result.pass = false;
    });
    runner.on('end', function () {
        process.stdout.write(constants_1.signal + JSON.stringify(result, null, 2));
    });
    function getIndexAndTitle(title) {
        var indexString = title.match(/^[0-9]+/);
        if (!indexString) {
            throw 'Tests should begin with a number, indicating the task number';
        }
        return {
            index: parseInt(indexString[0], 10),
            msg: title.slice(indexString[0].length + 1),
        };
    }
}
