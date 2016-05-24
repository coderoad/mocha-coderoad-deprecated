"use strict";
var fs_1 = require('fs');
var process_console_log_1 = require('process-console-log');
var constants_1 = require('./constants');
function writeTest(output) {
    output = process_console_log_1.logger + output;
    fs_1.writeFileSync(constants_1.testPath, output, 'utf8');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeTest;
