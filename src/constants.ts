import { join } from 'path';

const reporterPath = join(__dirname, 'reporter', 'index.js');

// test results are taken after this signal
// this helps to avoid parsing console.logs before the output
export const signal = '@@@CodeRoad Results@@@';

// path to test runner executable from "node_modules"
export const runnerPath = ['mocha', 'bin', 'mocha'];

// options passed in the runner command process
export const runnerOptions = [
  '--bail', // quit on first fail
  '--harmony', // es6 features
  '--no-colors',
  '--timeout=3000',
  '--compilers js:babel-register', // for import/export of modules
  `--reporter=${reporterPath}`, // test feedback
];
