import writeTests from './writeTests';
import runner from './runner';
import getTestPath from './testPath';

let settings: CombineTestsOptions = {
  dir: null,
  tutorial: null,
  tests: '',
  step: 0,
  testPath: '',
};

export const combineTests = (options: CombineTestsOptions) => {
  options.testPath = getTestPath(options);
  settings = Object.assign(settings, options);
  writeTests(options);
};

export default function start({ taskPosition, handleResult }) {
  const { dir } = settings;
  runner({
    dir,
    taskPosition,
    handleResult,
  });
}
