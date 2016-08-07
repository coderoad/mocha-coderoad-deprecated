import { join } from 'path';

/*
  import paths won't match the context of the test runner
  fixImportPaths will replace paths with absolute paths
*/

// import or require statement
const importPathRegex = /require\(["'](.+)["']\);?$|^import.+from\s?["'](.+)["'];?$/;
const relativePathRegex = /^\./;

export default function fixImportPaths(dir: string, str: string): string {
  return str.split('\n').map(line => {
    const isMatch = line.match(importPathRegex);
    if (!isMatch) {
      return line;
    }
    // multiple cases due to import or require regex
    const importPath = isMatch[1] || isMatch[2];
		// import path: may be relative or absolute
    // // relative path
    if (importPath.match(relativePathRegex)) {
      // process.env.DIR
      return line.replace(importPath, join(dir, importPath));
    }
		// no match, return line
    return line;
  }).join('\n');
}
