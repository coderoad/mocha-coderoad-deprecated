import { resolve } from 'path';

export default function tmpTestName(testFile: string): string {
  return resolve(__dirname, '..', '.tmp', testFile + '.js');
}
