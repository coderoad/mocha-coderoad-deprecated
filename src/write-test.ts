import {writeFileSync} from 'fs';
import {logger} from 'process-console-log';
import {testPath} from './constants';

export default function writeTest(output: string) {
  // append logger
  output = logger + output;
  // write test file
  writeFileSync(testPath, output, 'utf8');
}
