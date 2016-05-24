import {join, resolve} from 'path';
import {spawn} from 'child_process';
import fileExists from 'node-file-exists';
import {testPath} from './constants';

function getMocha(): string {
  // mocha, location may differ based on NPM version
  let mocha = join(__dirname, '..', '..', 'mocha', 'bin', 'mocha');
  if (!fileExists(mocha)) {
    mocha = join(__dirname, '..', 'node_modules', 'mocha', 'bin', 'mocha');
    if (!fileExists(mocha)) {
      let error = 'Error finding mocha';
      throw (error);
    }
  }
  return mocha;
}

function getNode(): string {
  if (process.platform === 'darwin' && process.resourcesPath) {
    return resolve(process.resourcesPath, '..', 'Frameworks', 'Atom Helper.app', 'Contents', 'MacOS', 'Atom Helper');
  } else if (process.platform.match(/win/)) {
    return 'node';
  }
  return process.execPath;
}

const node = getNode();
const mocha = getMocha();

export default function runnerProcess(config: CR.Config) {
  // node electron setup
  let options: any = {
    cwd: config.dir
  };
  if (options.env == null) {
    options.env = Object.create(process.env);
  }

  Object.assign(options.env, {
    ATOM_SHELL_INTERNAL_RUN_AS_NODE: 1,
    DIR: config.dir,
    TUTORIAL_DIR: config.dir,
    TASK_POSITION: config.taskPosition
  });

  // spawn child process calling mocha test runner
  return spawn(node, [
    // into shared node_modules directory
    mocha,
    '--bail',
    '--harmony',
    '--no-colors',
    `--reporter=${join(__dirname, 'reporter.js')}`,
    testPath

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
