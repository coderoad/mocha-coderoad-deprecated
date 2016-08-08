const babelRegister = `// run time compiler
require('babel-core/register')({plugins: [['transform-es2015-modules-commonjs',{
loose:true}]]});\n\n`;
export default babelRegister;
