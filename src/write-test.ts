import {writeFile} from 'fs';
import {logger} from 'process-console-log';
import exists from './exists';
import {testPath} from './constants';

export default function writeTest(config, testString: string) {
  return new Promise((resolve, reject) => {
		// append logger
    const output = logger + exists(config.dir) + testString;
		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
