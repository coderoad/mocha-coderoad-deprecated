"use strict";
var node_file_exists_1 = require('node-file-exists');
var path_1 = require('path');
var constants_1 = require('../../constants');
var nestedPath = [__dirname, '..', '..', '..', '..'].concat(constants_1.runnerPath);
var flattenedPath = [__dirname, '..', '..', '..', 'node_modules'].concat(constants_1.runnerPath);
function getRunner() {
    var nested = path_1.join.apply(this, nestedPath);
    var flattened = path_1.join.apply(this, flattenedPath);
    if (node_file_exists_1.default(nested)) {
        return nested;
    }
    else if (node_file_exists_1.default(flattened)) {
        return flattened;
    }
    throw new Error('Error finding test runner.');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getRunner;
