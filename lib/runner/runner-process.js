"use strict";
var path_1 = require('path');
var child_process_1 = require('child_process');
var mocha_1 = require('./paths/mocha');
var node_1 = require('./paths/node');
var reporterPath = path_1.join(__dirname, '..', 'reporter', 'index.js');
var node = node_1.default();
var mocha = mocha_1.default();
function spawnRunnerProcess(_a) {
    var dir = _a.dir, taskPosition = _a.taskPosition, testPath = _a.testPath;
    var options = {
        cwd: dir
    };
    if (options.env == null) {
        options.env = Object.create(process.env);
    }
    Object.assign(options.env, {
        ATOM_SHELL_INTERNAL_RUN_AS_NODE: 1,
        DIR: dir,
        TASK_POSITION: taskPosition,
        NODE_PATH: path_1.join(dir, 'node_modules'),
    });
    return child_process_1.spawn(node, [
        mocha,
        '--bail',
        '--harmony',
        '--no-colors',
        '--timeout=3000',
        '--compilers js:babel-core/register',
        ("--reporter=" + reporterPath),
        testPath,
    ], options);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = spawnRunnerProcess;
