import { join } from 'path';
import { spawn } from 'child_process';

import { runnerOptions } from '../constants';
import getRunner from './paths/runner';
import getNode from './paths/node';

const node = getNode();
const runner = getRunner();

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
  return spawn(node, [runner]
    .concat(runnerOptions)
    .concat(testPath) // unit tests
  , options);
}
