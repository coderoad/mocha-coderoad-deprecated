"use strict";
var fs_1 = require('fs');
var process_console_log_1 = require('process-console-log');
var import_paths_1 = require('./import-paths');
var exists_1 = require('./helpers/exists');
var babel_register_1 = require('./helpers/babel-register');
var rewire_1 = require('./helpers/rewire');
function writeTest(_a) {
    var dir = _a.dir, tests = _a.tests, testPath = _a.testPath;
    var fixImports = import_paths_1.default(dir, tests);
    var output = '(function(){\n'
        .concat('// run time compiler\n' + babel_register_1.default)
        .concat('// override console.log\n' + process_console_log_1.logger)
        .concat('// file exists function\n' + exists_1.default(dir))
        .concat('// rewire\n' + rewire_1.default)
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
