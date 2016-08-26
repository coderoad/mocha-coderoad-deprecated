"use strict";
var path_1 = require('path');
var isWindows = window.navigator.appVersion.indexOf('Win') > -1 || false;
function tmpTestName(testFile) {
    var testPath = path_1.join(__dirname, '..', '.tmp', testFile + '.js');
    if (isWindows) {
        testPath = testPath.split('/').join('\\');
    }
    return testPath;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tmpTestName;
