"use strict";
var fs_1 = require('fs');
var constants_1 = require('./constants');
function writeTest(output) {
    fs_1.writeFileSync(constants_1.testPath, output, 'utf8');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeTest;
