"use strict";
var fs_1 = require('fs');
var process_console_log_1 = require('process-console-log');
var exists_1 = require('./exists');
var constants_1 = require('./constants');
function writeTest(config, testString) {
    return new Promise(function (resolve, reject) {
        var output = process_console_log_1.logger + exists_1.default(config.dir) + testString;
        fs_1.writeFile(constants_1.testPath, output, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeTest;
