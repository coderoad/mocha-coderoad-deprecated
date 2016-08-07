"use strict";
var node_file_exists_1 = require('node-file-exists');
var path_1 = require('path');
function getMocha() {
    var mocha = path_1.join(__dirname, '..', '..', '..', '..', 'mocha', 'bin', 'mocha');
    if (!node_file_exists_1.default(mocha)) {
        mocha = path_1.join(__dirname, '..', '..', '..', 'node_modules', 'mocha', 'bin', 'mocha');
        if (!node_file_exists_1.default(mocha)) {
            var error = 'Error finding mocha';
            throw (error);
        }
    }
    return mocha;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getMocha;
