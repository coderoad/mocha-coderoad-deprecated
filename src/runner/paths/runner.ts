import fileExists from 'node-file-exists';
import { join } from 'path';
import { runnerPath } from '../../constants';

const nestedPath = [__dirname, '..', '..', '..', '..'].concat(runnerPath);
const flattenedPath = [__dirname, '..', '..', '..', 'node_modules'].concat(runnerPath);

export default function getRunner(): string {
  // runner, location may differ based on NPM version
  const nested = join.apply(this, nestedPath);
  const flattened = join.apply(this, flattenedPath);

  if (fileExists(nested)) {
    return nested;
  } else if (fileExists(flattened)) {
    return flattened;
  }
  throw new Error('Error finding test runner.');
}
