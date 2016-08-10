"use strict";
function helpers(projectDir) {
    return "\n  // run time compiler\n  require('babel-core/register')({plugins: [['transform-es2015-modules-commonjs',{\n  loose:true}]]});\n\n  // fileExists test helper\n  function fileExists(e,r){void 0===r&&(r=!0);try{accessSync(e,F_OK)}catch(c){if(c)return r||console.log(c),!1}return!0}var _require=require(\"fs\"),accessSync=_require.accessSync,F_OK=_require.F_OK,_require2=require(\"path\"),resolve=_require2.resolve;function exists(p){return fileExists(resolve('" + projectDir + "',p))}\n\n  // overwrite require to catch globals in tests\n  require = require('rewire');\n\n";
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = helpers;