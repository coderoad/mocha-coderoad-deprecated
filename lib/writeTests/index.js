"use strict";
var fs = require('fs');
var path_1 = require('path');
var process_console_log_1 = require('process-console-log');
var import_paths_1 = require('./import-paths');
var helpers_1 = require('./helpers');
var tmpPath = path_1.join(__dirname, '..', '..', '.tmp');
function writeTest(_a) {
    var dir = _a.dir, tests = _a.tests, testPath = _a.testPath;
    var output = "(function(){\n"
        .concat(process_console_log_1.logger)
        .concat(helpers_1.default(dir))
        .concat(import_paths_1.default(dir, tests))
        .concat('\n}());');
    writeTestFile(testPath, output);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeTest;
function writeTestFile(testPath, output) {
    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath);
    }
    return new Promise(function (resolve, reject) {
        fs.writeFile(testPath, output, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
