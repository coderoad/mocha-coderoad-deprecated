"use strict";
var path_1 = require('path');
var importPathRegex = /require\(["'](BASE.+)["']\);?$|^import.+?\s?["'](BASE.+)["'];?$/;
var relativePathRegex = /^BASE/;
function fixImportPaths(dir, str) {
    var entries = new Set([]);
    var arr = str.split('\n').map(function (line) {
        var isMatch = line.match(importPathRegex);
        if (!isMatch) {
            return line;
        }
        var importPath = isMatch[1] || isMatch[2];
        if (importPath.match(relativePathRegex)) {
            var newPath = path_1.join(dir, importPath.replace('BASE', ''));
            entries.add(line.replace(importPath, newPath));
            return '';
        }
        return line;
    });
    return (Array.from(entries.keys())
        .concat(arr)
        .join('\n'));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fixImportPaths;
