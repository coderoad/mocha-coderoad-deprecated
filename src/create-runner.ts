import * as path from 'path';
import {fileExists} from './exists';
const spawn = require('child_process').spawn;

// get absolute path to node exec
let node = null;
if (process.platform === 'darwin' && process.resourcesPath) {
  node = path.resolve(process.resourcesPath, '..', 'Frameworks', 'Atom Helper.app', 'Contents', 'MacOS', 'Atom Helper');
} else if (process.platform.match(/win/)) {
  node = 'node';
} else {
  node = process.execPath;
}

// mocha, location may differ based on NPM version
let mocha = path.join(__dirname, '..', '..', 'mocha', 'bin', 'mocha');
if (!fileExists(mocha)) {
  mocha = path.join(__dirname, '..', 'node_modules', 'mocha', 'bin', 'mocha');
  if (!fileExists(mocha)) {
    let error = 'Error finding mocha';
    throw (error);
  }
}

export function createRunner(config: CR.Config, testFile: string) {
  // node electron setup
  let options: any = {
    cwd: config.dir
  };
  if (options.env == null) {
    options.env = Object.create(process.env);
  }
  options.env.ATOM_SHELL_INTERNAL_RUN_AS_NODE = 1;
  // options.env.ELECTRON_RUN_AS_NODE = 1;

  options.env.DIR = config.dir;
  options.env.TUTORIAL_DIR = config.tutorialDir;
  options.env.TASK_POSITION = config.taskPosition;

  // spawn child process calling mocha test runner
  return spawn(node, [
  // into shared node_modules directory
    mocha,
    '--bail',
    '--harmony',
    '--no-colors',
    `--reporter=${path.join(__dirname, 'reporter.js') }`,
    testFile
  ], options);
  // .concat(runnerOptions)
}

// function setRunnerOptions(config) {
//   let runnerOptions = [];
//   if (!config.testRunnerOptions) {
//     return runnerOptions;
//   }
//   if (config.testRunnerOptions.babel) {
//     require('babel-core');
//     let babelOptions = [
//       '--require babel-polyfill',
//       '--compilers js:babel-core/register'
//     ];
//     runnerOptions.concat(babelOptions);
//   }
//   return runnerOptions;
// }
