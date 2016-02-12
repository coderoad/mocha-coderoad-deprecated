"use strict";
var utils_1 = require('./utils');
var createRunner_1 = require('./createRunner');
function runner(files, config, handleTestResult, handleLog) {
    var tests = utils_1.concatAll(files);
    var runner = createRunner_1.createRunner(config, tests);
    runner.stdout.on('data', function (data) {
        var result = {
            pass: false,
            position: 0,
            failedAt: null,
            failure: null
        };
        var signalMatch = new RegExp(utils_1.signal);
        var match = signalMatch.exec(data);
        if (!!match) {
            var printed = data.toString().substring(0, match.index);
            if (!!printed.length) {
                var start = printed.substring(0, printed.length / 2);
                var end = printed.substring(printed.length / 2, printed.length);
                var message = '';
                if (start === end) {
                    message = start;
                }
                else {
                    message = printed;
                }
                handleLog(message);
            }
            var testResultString = data.toString().substring(match.index + 22);
            var testResult = JSON.parse(testResultString);
            if (!testResult.failed) {
                result.pass = false;
                result.failure = testResult.failures[0];
                result.position = findFailureTestPosition(files, testResult.failedAt);
            }
            else {
                result.pass = true;
                result.position = files.length;
            }
        }
        else {
            console.log('Error with test', data);
        }
        handleTestResult(result);
    });
    runner.stderr.on('error', function (data) {
        console.log('test error', data);
    });
    runner.on('close', function (code) {
        if (code === 1) {
            console.error('Error running test');
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runner;
function findFailureTestPosition(files, file) {
    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf(file) > -1) {
            return i;
        }
    }
    return 0;
}
