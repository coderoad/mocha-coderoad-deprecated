var vm = require('vm');
var fs = require('fs');
var path = require('path');
global.loadJS = function loadJS(pathToContext) {
    var absPath = path.join(process.env.DIR, pathToContext);
    var context = fs.readFileSync(absPath, 'utf8');
    vm.runInThisContext(context);
};
