"use strict";
var babelRegister = "// run time compiler\nrequire('babel-core/register')({plugins: [['transform-es2015-modules-commonjs',{\nloose:true}]]});\n\n";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = babelRegister;
