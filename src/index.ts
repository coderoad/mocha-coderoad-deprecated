import writeTests from './writeTests';
import runner from './runner';
import getTestPath from './testPath';

let settings: CombineTestsOptions = {
  dir: null,
  tutorial: null,
  tests: '',
  pagePosition: 0,
  testPath: '',
};

export function load(options: CombineTestsOptions) {
  options.testPath = getTestPath(options);
  settings = Object.assign(settings, options);
  writeTests(options);
};

export function run({ taskPosition, handleResult }) {
  const { dir } = settings;
  runner({
    dir,
    taskPosition,
    handleResult,
  });
}
