import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import exists from './exists';
import {testPath} from './constants';
import * as ts from 'typescript';
import importPaths from './import-paths';

export default function writeTest(config, testString: string) {
  return new Promise((resolve, reject) => {
    // fix import paths relative to project dir instead of test runner
    const testStringWithFixedImportPaths = importPaths(testString);

    const output = ''
        // append logger
        .concat(logger)
        // exists polyfill for file/folder exists checks
        .concat(exists(config.dir))
        // compile using ts
        .concat(
          ts.transpile(testStringWithFixedImportPaths, {
            module: ts.ModuleKind.CommonJS
          })
        );
		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
