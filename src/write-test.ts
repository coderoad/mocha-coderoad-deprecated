import {writeFileSync} from 'fs';
import {logger} from 'process-console-log';
import exists from './exists';
import {testPath} from './constants';

export default function writeTest(config, testString: string) {

  // append logger
  const output = logger + exists(config.dir) + testString;
  // write test file
  writeFileSync(testPath, output, 'utf8');
}
