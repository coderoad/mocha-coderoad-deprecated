import { join } from 'path';

export default function tmpTestName({tutorial, step}): string {
  if (!tutorial || !tutorial.name || !tutorial.version || !step) {
    console.log('Error creating temporary test name');
  }
  return join(
    __dirname, '..', '..', '.tmp',
    tutorial.name, tutorial.version, step + '.js'
  );
}
