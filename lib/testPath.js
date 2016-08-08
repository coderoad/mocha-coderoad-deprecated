"use strict";
var path_1 = require('path');
function tmpTestName(testFile) {
    return path_1.resolve(__dirname, '..', '.tmp', testFile + '.js');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tmpTestName;
