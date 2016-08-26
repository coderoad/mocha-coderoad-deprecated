"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var js_coderoad_1 = require('js-coderoad');
var tmpPath = path_1.join(__dirname, '..', '..', '.tmp');
function writeTest(_a) {
    var dir = _a.dir, tests = _a.tests, testPath = _a.testPath;
    var output = js_coderoad_1.default({ dir: dir, content: tests });
    writeTestFile(testPath, output);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeTest;
function writeTestFile(testPath, output) {
    if (!fs_1.existsSync(tmpPath)) {
        fs_1.mkdirSync(tmpPath);
    }
    return new Promise(function (resolve, reject) {
        fs_1.writeFile(testPath, output, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
