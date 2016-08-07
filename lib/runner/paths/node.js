"use strict";
var path_1 = require('path');
function getNode() {
    if (process.platform === 'darwin' && process.resourcesPath) {
        return path_1.resolve(process.resourcesPath, '..', 'Frameworks', 'Atom Helper.app', 'Contents', 'MacOS', 'Atom Helper');
    }
    else if (process.platform.match(/win/)) {
        return 'node';
    }
    return process.execPath;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNode;
