"use strict";
var path_1 = require('path');
var reporterPath = path_1.join(__dirname, 'reporter', 'index.js');
exports.signal = '@@@CodeRoad Results@@@';
exports.runnerPath = ['mocha', 'bin', 'mocha'];
exports.runnerOptions = [
    '--bail',
    '--harmony',
    '--no-colors',
    '--timeout=3000',
    '--compilers js:babel-register',
    ("--reporter=" + reporterPath),
];
