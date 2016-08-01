"use strict";
var constants_1 = require('./constants');
var runner_process_1 = require('./runner-process');
var write_test_1 = require('./write-test');
var process_console_log_1 = require('process-console-log');
function runner(_a) {
    var testString = _a.testString, config = _a.config, handleResult = _a.handleResult;
    write_test_1.default(config, testString);
    var runner = runner_process_1.default(config);
    var final = null;
    var signalMatch = new RegExp(constants_1.signal);
    return new Promise(function run(resolve, reject) {
        runner.stdout.on('data', function onData(data) {
            data = data.toString();
            var match = signalMatch.exec(data);
            if (!match) {
                try {
                    process_console_log_1.parseLog(data);
                }
                catch (e) {
                    process_console_log_1.parseLog(data);
                }
                return;
            }
            var resultString = data.substring(match.index + constants_1.signal.length);
            var result = JSON.parse(JSON.stringify(resultString));
            if (typeof result === 'string') {
                result = JSON.parse(result);
            }
            switch (result.pass) {
                case true:
                    final = result.passes[result.passes.length - 1];
                    break;
                case false:
                    final = result.failures[0];
                    break;
                default:
                    console.log('error processing result: ', result);
            }
            final.change = final.taskPosition - config.taskPosition;
            final.pass = final.change > 0;
            final.completed = result.pass;
            handleResult(final);
        });
        runner.stderr.on('data', function onError(data) {
            console.log('test error', data.toString());
        });
        runner.on('close', function onClose(code) {
            resolve(final);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runner;
