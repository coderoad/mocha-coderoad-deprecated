"use strict";
var fs_1 = require('fs');
var process_console_log_1 = require('process-console-log');
var import_paths_1 = require('./import-paths');
var helpers_1 = require('./helpers');
function writeTest(_a) {
    var dir = _a.dir, tests = _a.tests, testPath = _a.testPath;
    var fixImports = import_paths_1.default(dir, tests);
    var output = "(function(){\n'use strict';\n"
        .concat(process_console_log_1.logger)
        .concat(helpers_1.default(dir))
        .concat(fixImports)
        .concat('\n}());');
    return new Promise(function (resolve, reject) {
        fs_1.writeFile(testPath, output, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeTest;
