import { join } from 'path';

/*
  import paths won't match the context of the test runner
  fixImportPaths will replace paths with absolute paths
*/

// import or require statement
const importPathRegex = /require\(["'](BASE.+)["']\);?$|^import.+?\s?["'](BASE.+)["'];?$/;
const relativePathRegex = /^BASE/;

export default function fixImportPaths(dir: string, str: string): string {
  // collect import lines
  let entries = new Set([]);

  let arr = str.split('\n').map(line => {
    // line has an import or require ?
    const isMatch = line.match(importPathRegex);
    if (!isMatch) {
      return line;
    }
    // multiple cases due to import or require regex
    const importPath = isMatch[1] || isMatch[2];
    // import path: may be relative or absolute

    // relative path
    if (importPath.match(relativePathRegex)) {

      let newPath = join(dir, importPath.replace('BASE', ''));

      // add to map of entry files
      entries.add(line.replace(importPath, newPath));
      return '';
    }
		// no match, return line
    return line;
  });
  // prepend import paths to output
  return (
    Array.from(entries.keys())
    .concat(arr)
    .join('\n')
  );
}
