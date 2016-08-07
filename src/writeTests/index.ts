import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import importPaths from './import-paths';
import exists from './helpers/exists';
// import compiler from './helpers/compiler';
import babelRegister from './helpers/babel-register';

export default function writeTest({ dir, tests, testPath }: CombineTestsOptions) {
  return new Promise((resolve, reject) => {

    // fix import paths relative to project dir instead of test runner
    const fixImports = importPaths(dir, tests);
    // const compiled = compiler(fixImports);

    const output = ''
        // append logger
        .concat(logger)
        // exists polyfill for file/folder exists checks
        .concat(exists(dir))
        // babel hook to handle import / export in other files
        .concat(babelRegister)
        // compile using ts
        .concat(fixImports);

		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
