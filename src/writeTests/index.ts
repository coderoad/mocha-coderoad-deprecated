import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import importPaths from './import-paths';
import exists from './helpers/exists';
// import compiler from './compiler';
import babelRegister from './helpers/babel-register';
import rewire from './helpers/rewire';

export default function writeTest({ dir, tests, testPath }) {

  // fix import paths relative to project dir instead of test runner
  const fixImports = importPaths(dir, tests);
  // const compiled = compiler(fixImports);

  const output = '(function(){\n'
      // babel hook to handle import / export in other files
      .concat('// run time compiler\n' + babelRegister)
      // append logger for capturing log values and types
      .concat('// override console.log\n' + logger)
      // exists polyfill for file/folder exists checks
      .concat('// file exists function\n' + exists(dir))
      // allow access to module globals
      .concat('// rewire\n' + rewire)
      // fixed imports
      .concat(fixImports)
      .concat('\n}());');

  return new Promise((resolve, reject) => {
		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
