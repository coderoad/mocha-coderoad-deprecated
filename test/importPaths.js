const expect = require('chai').expect;
const fixImportPaths = require('../lib/helpers/import-paths').default;

describe('import paths', () => {

  it('should replace BASE in an import statement', () => {
    const example = "import a from 'BASE/somewhere.js';";
    const result = fixImportPaths('example', example);
    expect(result).to.not.match(/BASE/);
    expect(result).to.match(/example/);
  });

  it('should replace BASE in a require statement', () => {
    const example = "const a = require('BASE/somewhere.js');";
    const result = fixImportPaths('example', example);
    expect(result).to.not.match(/BASE/);
    expect(result).to.match(/example/);
  });

  it('should not effect package imports', () => {
      const example = "import a from 'package';";
      const result = fixImportPaths('example', example);
      expect(result).to.match(/package/);
      expect(result).to.not.match(/example/);
  });

  it('should not effect package requires', () => {
      const example = "const a = require('package')';";
      const result = fixImportPaths('example', example);
      expect(result).to.match(/package/);
      expect(result).to.not.match(/example/);
  });


  it('should move the imports to the top of the file', () => {
    const example = `const b = 12;
import a from 'BASE/somewhere.js';
`;
    const result = fixImportPaths('example', example);
    const firstLine = result.split('\n')[0];
    expect(result).to.not.match(/BASE/);
    expect(result).to.match(/example/);
  });

});
