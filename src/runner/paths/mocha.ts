import fileExists from 'node-file-exists';
import {join} from 'path';

export default function getMocha(): string {
  // mocha, location may differ based on NPM version
  let mocha = join(__dirname, '..', '..', '..', '..', 'mocha', 'bin', 'mocha');
  if (!fileExists(mocha)) {
    mocha = join(__dirname, '..', '..', '..', 'node_modules', 'mocha', 'bin', 'mocha');
    if (!fileExists(mocha)) {
      let error = 'Error finding mocha';
      throw (error);
    }
  }
  return mocha;
}
