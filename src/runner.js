"use strict";
var utils_1 = require('./utils');
var create_runner_1 = require('./create-runner');
function runner(files, config, handleResult, handleLog) {
    var tests = utils_1.concatAll(files);
    var runner = create_runner_1.createRunner(config, tests);
    var result = {
        pass: false,
        taskPosition: 0,
        failedAtFile: null,
        msg: null
    };
    return new Promise(function (resolve, reject) {
        runner.stdout.on('data', function (data) {
            var signalMatch = new RegExp(utils_1.signal);
            var match = signalMatch.exec(data);
            if (!!match) {
                var printed = data.toString().substring(0, match.index);
                if (!!printed.length) {
                    var start = printed.substring(0, printed.length / files.length);
                    var end = printed.substring(printed.length / files.length, printed.length);
                    var message = '';
                    if (start === end) {
                        message = start;
                    }
                    else {
                        message = printed;
                    }
                    handleLog(message);
                }
                var testResultString = data.toString().substring(match.index + utils_1.signal.length);
                var testResult = JSON.parse(JSON.stringify(testResultString));
                if (typeof testResult === 'string') {
                    testResult = JSON.parse(testResult);
                }
                if (testResult.failedAtFile) {
                    result.taskPosition = findFailureTestPosition(files, testResult.failedAtFile);
                    result.msg = testResult.failures[0].msg;
                    result.failedAtFile = testResult.failedAtFile;
                }
                else {
                    result.taskPosition = files.length;
                    result.msg = testResult.passes[testResult.passes.length - 1].msg;
                }
            }
            else {
                console.log('Result test data doesn\'t match signal string', data.toString());
            }
            handleResult(result);
        });
        runner.stderr.on('data', function (data) {
            console.log('test error', data.toString());
        });
        runner.on('close', function (code) {
            if (code === 0) {
                resolve(result);
            }
            else {
                resolve(result);
            }
        });
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
