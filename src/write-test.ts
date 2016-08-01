import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import exists from './exists';
import {testPath} from './constants';
import * as ts from 'typescript';

export default function writeTest(config, testString: string) {
  return new Promise((resolve, reject) => {
		// append logger, compile using ts compiler
    const output = logger + exists(config.dir) + ts.transpile(testString, {
      module: ts.ModuleKind.CommonJS
    });
		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
