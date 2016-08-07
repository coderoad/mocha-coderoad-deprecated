import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import exists from './exists';
import {testPath} from './constants';
import importPaths from './import-paths';
import compiler from './compiler';

export default function writeTest(config, testString: string) {
  return new Promise((resolve, reject) => {
    // fix import paths relative to project dir instead of test runner
    const testStringWithFixedImportPaths = importPaths(config.dir, testString);

    const output = ''
        // append logger
        .concat(logger)
        // exists polyfill for file/folder exists checks
        .concat(exists(config.dir))
        // babel hook to handle import / export in other files
        .concat(`require("babel-register")({"plugins": [["transform-es2015-modules-commonjs", {"strict": true,"loose": true}]]});`)
        // compile using ts
        .concat(compiler(testStringWithFixedImportPaths));

		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
