"use strict";
var helpers = "\n// run time compiler\nrequire('babel-core/register')({plugins: [['transform-es2015-modules-commonjs',{\nloose:true}]]});\n\nfunction fileExists(e,r){void 0===r&&(r=!0);try{accessSync(e,F_OK)}catch(c){if(c)return r||console.log(c),!1}return!0}var _require=require(\"fs\"),accessSync=_require.accessSync,F_OK=_require.F_OK,_require2=require(\"path\"),resolve=_require2.resolve;function exists(p){return fileExists(resolve('" + projectDir + "',p))}\n\nrequire = require('rewire');\n";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = helpers;
