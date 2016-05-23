"use strict";
var path_1 = require('path');
var child_process_1 = require('child_process');
var node_file_exists_1 = require('node-file-exists');
var constants_1 = require('./constants');
function getMocha() {
    var mocha = path_1.join(__dirname, '..', '..', 'mocha', 'bin', 'mocha');
    if (!node_file_exists_1.default(mocha)) {
        mocha = path_1.join(__dirname, '..', 'node_modules', 'mocha', 'bin', 'mocha');
        if (!node_file_exists_1.default(mocha)) {
            var error = 'Error finding mocha';
            throw (error);
        }
    }
    return mocha;
}
function getNode() {
    if (process.platform === 'darwin' && process.resourcesPath) {
        return path_1.resolve(process.resourcesPath, '..', 'Frameworks', 'Atom Helper.app', 'Contents', 'MacOS', 'Atom Helper');
    }
    else if (process.platform.match(/win/)) {
        return 'node';
    }
    return process.execPath;
}
var node = getNode();
var mocha = getMocha();
function runnerProcess(config) {
    var options = {
        cwd: config.dir
    };
    if (options.env == null) {
        options.env = Object.create(process.env);
    }
    options.env.ATOM_SHELL_INTERNAL_RUN_AS_NODE = 1;
    options.env.DIR = config.dir;
    options.env.TUTORIAL_DIR = config.dir;
    options.env.TASK_POSITION = config.taskPosition;
    return child_process_1.spawn(node, [
        mocha,
        '--bail',
        '--harmony',
        '--no-colors',
        ("--reporter=" + path_1.join(__dirname, 'reporter.js')),
        constants_1.testPath
    ], options);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = runnerProcess;
