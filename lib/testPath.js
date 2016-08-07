"use strict";
var path_1 = require('path');
function tmpTestName(_a) {
    var tutorial = _a.tutorial, step = _a.step;
    if (!tutorial || !tutorial.name || !tutorial.version || !step) {
        console.log('Error creating temporary test name');
    }
    return path_1.join(__dirname, '..', '..', '.tmp', tutorial.name, tutorial.version, step + '.js');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tmpTestName;
