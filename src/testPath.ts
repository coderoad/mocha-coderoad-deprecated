import { join } from 'path';

const isWindows = window.navigator.appVersion.indexOf('Win') > -1 || false;

export default function tmpTestName(testFile: string): string {
  let testPath = join(__dirname, '..', '.tmp', testFile + '.js');
  // fix bug on Windows for test paths
  if (isWindows) {
    testPath = testPath.split('/').join('\\');
  }
  return testPath;
}
