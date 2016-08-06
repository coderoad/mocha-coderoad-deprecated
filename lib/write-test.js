"use strict";
var fs_1 = require('fs');
var process_console_log_1 = require('process-console-log');
var exists_1 = require('./exists');
var constants_1 = require('./constants');
var ts = require('typescript');
var import_paths_1 = require('./import-paths');
function writeTest(config, testString) {
    return new Promise(function (resolve, reject) {
        var testStringWithFixedImportPaths = import_paths_1.default(testString);
        var output = ''
            .concat(process_console_log_1.logger)
            .concat(exists_1.default(config.dir))
            .concat(ts.transpile(testStringWithFixedImportPaths, {
            module: ts.ModuleKind.CommonJS
        }));
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
