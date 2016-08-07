"use strict";
var fs_1 = require('fs');
var process_console_log_1 = require('process-console-log');
var exists_1 = require('./exists');
var constants_1 = require('./constants');
var import_paths_1 = require('./import-paths');
var compiler_1 = require('./compiler');
function writeTest(config, testString) {
    return new Promise(function (resolve, reject) {
        var testStringWithFixedImportPaths = import_paths_1.default(config.dir, testString);
        var output = ''
            .concat(process_console_log_1.logger)
            .concat(exists_1.default(config.dir))
            .concat("require(\"babel-register\")({\"plugins\": [[\"transform-es2015-modules-commonjs\", {\"strict\": true,\"loose\": true}]]});")
            .concat(compiler_1.default(testStringWithFixedImportPaths));
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
