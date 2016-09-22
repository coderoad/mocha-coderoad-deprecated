"use strict";
var path_1 = require('path');
var child_process_1 = require('child_process');
var constants_1 = require('../constants');
var runner_1 = require('./paths/runner');
var node_1 = require('./paths/node');
var node = node_1.default();
var runner = runner_1.default();
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
    return child_process_1.spawn(node, [runner]
        .concat(constants_1.runnerOptions)
        .concat(testPath), options);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = spawnRunnerProcess;
