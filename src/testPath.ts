import { join } from 'path';

export default function tmpTestName({tutorial, pagePosition}): string {
  console.log(tutorial, tutorial.name, tutorial.version, pagePosition);
  if (!tutorial || !tutorial.name || !tutorial.version || typeof pagePosition !== 'number') {
    console.log('Error creating temporary test name');
  }
  return join(
    __dirname, '..', '.tmp',
    `${tutorial.name}__${tutorial.version}__${pagePosition}.js`
  );
}
