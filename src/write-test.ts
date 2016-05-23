import {writeFileSync} from 'fs';
import {testPath} from './constants';

export default function writeTest(output: string) {
  writeFileSync(testPath, output, 'utf8');
}
