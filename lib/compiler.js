"use strict";
var ts = require('typescript');
function compiler(str) {
    return ts.transpile(str, {
        module: ts.ModuleKind.CommonJS,
        target: 'es5',
        allowJs: true,
        allowUnreachableCode: true,
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compiler;
