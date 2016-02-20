"use strict";
var fs = require('fs');
function concatTests(targetFile, files) {
    if (fs.existsSync(targetFile)) {
        fs.unlink(targetFile);
    }
    files.forEach(function (tests) {
        if (typeof tests === 'string') {
            readAppend(targetFile, tests);
        }
        if (Object.prototype.toString.call(tests) === '[object Array]') {
            tests.forEach(function (test) {
                readAppend(targetFile, test);
            });
        }
    });
    return targetFile;
}
exports.concatTests = concatTests;
function readAppend(targetFile, file) {
    fs.readFile(file, function (err, data) {
        if (err) {
            throw err;
        }
        fs.appendFile(targetFile, data, function (appendErr) {
            if (appendErr) {
                throw appendErr;
            }
        });
    });
}
