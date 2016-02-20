"use strict";
var utils_1 = require('./utils');
var create_runner_1 = require('./create-runner');
;
function runner(testFile, config, handleResult, handleLog) {
    var runner = create_runner_1.createRunner(config, testFile);
    var final = null;
    var signalMatch = new RegExp(utils_1.signal);
    return new Promise(function (resolve, reject) {
        runner.stdout.on('data', function (data) {
            var match = signalMatch.exec(data);
            if (!match) {
                throw 'Result test data doesn\'t match signal string', data.toString();
            }
            if (match.index > 0) {
                var log = data.toString().substring(0, match.index);
                if (!!log.length) {
                    handleLog(log);
                }
            }
            var resultString = data.toString().substring(match.index + utils_1.signal.length);
            var result = JSON.parse(JSON.stringify(resultString));
            if (typeof result === 'string') {
                result = JSON.parse(result);
            }
            if (!result.pass) {
                final = result.failures[0];
            }
            else {
                final = result.passes[result.passes.length - 1];
            }
            handleResult(final);
        });
        runner.stderr.on('data', function (data) {
            console.log('test error', data.toString());
        });
        runner.on('close', function (code) {
            if (code === 0) {
                resolve(final);
            }
            else {
                resolve(final);
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runner;
