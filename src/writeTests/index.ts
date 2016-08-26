import { existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';
import jsCodeRoad from 'js-coderoad';

// store compiled tests in mocha-coderoad/.tmp
const tmpPath = join(__dirname, '..', '..', '.tmp');

export default function writeTest({ dir, tests, testPath }) {

  const output = jsCodeRoad({dir, content: tests});

  writeTestFile(testPath, output);
}

function writeTestFile(testPath: string, output: string) {
  // create .tmp directory if doesn't exist
  if (!existsSync(tmpPath)) {
    mkdirSync(tmpPath);
  }
  return new Promise((resolve, reject) => {
		// write test file
    writeFile(testPath, output, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}
