import writeTests from './writeTests';
import runner from './runner';
import getTestPath from './testPath';

export function load({ dir, testFile, tests }) {
  writeTests({
    dir,
    tests,
    testPath: getTestPath(testFile),
  });
};

export function run({ dir, taskPosition, handleResult, testFile }) {
  runner({
    dir,
    taskPosition,
    handleResult,
    testPath: getTestPath(testFile),
  });
}
