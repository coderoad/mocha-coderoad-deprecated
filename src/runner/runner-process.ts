import {join} from 'path';
import {spawn} from 'child_process';

import getMocha from './paths/mocha';
import getNode from './paths/node';

const reporterPath = join(__dirname, '..', 'reporter', 'index.js');
const node = getNode();
const mocha = getMocha();

export default function spawnRunnerProcess({dir, taskPosition, testPath}) {
  // node electron setup
  let options: any = {
    cwd: dir
  };
  if (options.env == null) {
    options.env = Object.create(process.env);
  }

  Object.assign(options.env, {
    ATOM_SHELL_INTERNAL_RUN_AS_NODE: 1,
    DIR: dir, // user project directory
    TASK_POSITION: taskPosition,
    NODE_PATH: join(dir, 'node_modules'),
  });

  // spawn child process calling mocha test runner
  return spawn(node, [
    // into shared node_modules directory
    mocha,
    '--bail', // quit on first fail
    '--harmony', // es6 features
    '--no-colors',
    '--timeout=3000',
    '--compilers js:babel-register', // for import/export of modules
    `--reporter=${reporterPath}`, // test feedback
    testPath, // unit tests
  ], options);
}
