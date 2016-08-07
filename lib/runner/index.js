"use strict";
var start_runner_1 = require('./start-runner');
var runner_process_1 = require('./runner-process');
function runner(options) {
    var runner = runner_process_1.default(options);
    return start_runner_1.default(runner, options.handleResult);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runner;
