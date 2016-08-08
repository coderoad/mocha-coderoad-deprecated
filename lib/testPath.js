"use strict";
var path_1 = require('path');
function tmpTestName(_a) {
    var tutorial = _a.tutorial, pagePosition = _a.pagePosition;
    console.log(tutorial, tutorial.name, tutorial.version, pagePosition);
    if (!tutorial || !tutorial.name || !tutorial.version || typeof pagePosition !== 'number') {
        console.log('Error creating temporary test name');
    }
    return path_1.join(__dirname, '..', '.tmp', tutorial.name + "__" + tutorial.version + "__" + pagePosition + ".js");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tmpTestName;
