"use strict";
var process_console_log_1 = require('process-console-log');
var constants_1 = require('../constants');
var signalMatch = new RegExp(constants_1.signal);
function startRunner(_a) {
    var runner = _a.runner, handleResult = _a.handleResult, taskPosition = _a.taskPosition;
    var final = null;
    new Promise(function run(resolve, reject) {
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
            final.change = final.taskPosition - taskPosition;
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
exports.default = startRunner;
