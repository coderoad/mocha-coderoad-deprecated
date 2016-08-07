"use strict";
var path_1 = require('path');
var importPathRegex = /require\(["'](.+)["']\);?$|^import.+from\s?["'](.+)["'];?$/;
var relativePathRegex = /^\./;
function fixImportPaths(dir, str) {
    return str.split('\n').map(function (line) {
        var isMatch = line.match(importPathRegex);
        if (!isMatch) {
            return line;
        }
        var importPath = isMatch[1] || isMatch[2];
        if (importPath.match(relativePathRegex)) {
            return line.replace(importPath, path_1.join(dir, importPath));
        }
        return line;
    }).join('\n');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fixImportPaths;
