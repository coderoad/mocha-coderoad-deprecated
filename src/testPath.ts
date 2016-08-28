import { join } from 'path';

const isWindows = window.navigator.appVersion.includes('Win') || false;

export default function tmpTestName(testFile: string): string {
  let testPath = join(__dirname, '..', '.tmp', testFile + '.js');
  if (isWindows) {
    testPath = testPath.split('/').join('\\');
  }
  return testPath;
}
