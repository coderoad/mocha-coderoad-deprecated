import * as fs from 'fs';
import { join } from 'path';
import { logger } from 'process-console-log';
import importPaths from './import-paths';
import helpers from './helpers';

const tmpPath = join(__dirname, '..', '..', '.tmp');

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

  writeTestFile(testPath, output);
}

function writeTestFile(testPath: string, output: string) {
  // create .tmp directory if doesn't exist
  if (!fs.existsSync(tmpPath)) {
    fs.mkdirSync(tmpPath);
  }
  return new Promise((resolve, reject) => {
		// write test file
    fs.writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
