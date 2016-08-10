import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import importPaths from './import-paths';
import helpers from './helpers';

export default function writeTest({ dir, tests, testPath }) {

  // fix import paths relative to project dir instead of test runner
  const fixImports = importPaths(dir, tests);
  // const compiled = compiler(fixImports);

  const output = `(function(){\n'use strict';\n`
      // append logger for capturing log values and types
      .concat(logger)
      // 1. babel hook to handle import / export in other files
      // 2. exists polyfill for file/folder exists checks
      // 3. allow access to module globals
      .concat(helpers(dir))
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
