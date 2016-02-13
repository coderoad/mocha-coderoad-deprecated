"use strict";
var path = require('path');
var spawn = require('child_process').spawn;
function createRunner(config, tests) {
    var options = {
        cwd: config.dir
    };
    if (options.env == null) {
        options.env = Object.create(process.env);
    }
    options.env.ATOM_SHELL_INTERNAL_RUN_AS_NODE = 1;
    options.env.DIR = config.dir;
    options.env.TUTORIAL_DIR = config.tutorialDir;
    var node = null;
    if (process.platform === 'darwin' && process.resourcesPath) {
        node = path.resolve(process.resourcesPath, '..', 'Frameworks', 'Atom Helper.app', 'Contents', 'MacOS', 'Atom Helper');
    }
    else {
        node = process.execPath;
    }
    var runnerOptions = setRunnerOptions(config);
    return spawn(node, [
        '/usr/local/bin/mocha',
        '--bail',
        '--harmony',
        ("--reporter=" + path.join(__dirname, 'reporter'))
    ].concat(runnerOptions).concat(tests), options);
}
exports.createRunner = createRunner;
function setRunnerOptions(config) {
    var runnerOptions = [];
    if (!config.testRunnerOptions) {
        return runnerOptions;
    }
    if (config.testRunnerOptions.babel) {
        require('babel-core');
        runnerOptions.push('--compilers js:babel-core/register');
    }
    return runnerOptions;
}
