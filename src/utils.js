"use strict";
exports.signal = '@@@CodeRoad Results@@@';
function concatAll(items) {
    var results = [];
    items.forEach(function (subArray) {
        subArray.forEach(function (item) {
            results.push(item);
        });
    });
    return results;
}
exports.concatAll = concatAll;
