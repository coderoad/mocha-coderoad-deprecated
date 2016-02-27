# Mocha CodeRoad

[Atom-CodeRoad](https://github.com/coderoad/atom-coderoad) Javascript test runner & reporter.

    npm install mocha-coderoad


### Test Statements

It makes sense to write test statements using 'should', 'must' or negative statements. Remember, the failing test message will be delivered as feedback to the user.

```js
it('should be a function')
it('must be a function')
it('isn\'t a function')
```

### Loaders

Use a **loader** to run the user saved file in the context of your file. Think of a loader as a way to place the file your testing inside of your test file. Import your loader and run it on a specific user file.

```js
var loadJS = require('path/to/loadJS').default;
loadJS('user-file.js');
// adds file contents here
```

You'll have to roll your own loader to fit your project, but there are example [loaders](https://coderoad.github.io/docs/#loaders) included later in the docs.

*Note: When using spies, stubs or mocks, initiate them above your loader call.*

Tutorials may be written in different programming languages or for different compilers, so there isn't yet a standard way to load data from user created files. Instead, you'll have to load/transpile your files for the test runner. Rolling your own solution allows you to load data in a way that fits your project.

There may be a simpler approach in the future, but for now these snippets should help:


#### loadJS (JavaScript)

```js
var vm = require('vm'),
  fs = require('fs'),
  path = require('path');
function loadJS(pathToContext) {
  var absPath = path.join(process.env.DIR, pathToContext);
  var code = fs.readFileSync(absPath, 'utf8');
  vm.runInThisContext(code);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadJS;
```

#### loadBabel (Babel)

See the [Babel documentation](https://babeljs.io/docs/setup/#node) on how to install Babel & the selected [presets](http://babeljs.io/docs/plugins/#presets). Set the [options](http://babeljs.io/docs/usage/options/) you need.

`> npm i -s babel-core` + presets

```js
var vm = require('vm'),
    fs = require('fs'),
    path = require('path'),
    babel = require('babel'),
    options = {
      presets: ['es2015']
    };
function loadBabel(pathToContext) {
    var absPath = path.join(process.env.DIR, pathToContext);
    var code = fs.readFileSync(absPath, 'utf8');
    var js = babel.transform(code, options);
      vm.runInThisContext(js);
    }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadBabel;
```

#### loadTS (TypeScript)

To use TypeScript, install the package as a tutorial dependency.

`> npm i -s typescript`

```js
var ts = require('typescript'),
    options = {
        module: 'commonjs',
        target: 'ES5'
    };
function loadTS(pathToContext) {
    var absPath = path.join(process.env.DIR, pathToContext);
    var code = fs.readFileSync(absPath, 'utf8');
    var js = ts.transpile(code, options);
        vm.runInThisContext(js);
    }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadTS;
```


### Loading Data Files

Data can be loaded in the user's file by setting it as a global within the test. Remember, the top of the test file (above the loader), acts as the top of the user's page.

Although bad practice, it can be easiest to set data to the global scope.

```js
if (!global.data) {
    global.data = 43;
}

if (!global.data2) {
    global.data2 = JSON.parse(JSON.stringify(require('./data2.json')));
}
```

Users can access global data by name in their file.

```js
var secret = data - 1;
```

Here are examples using *mocha* with *chai*'s *expect*. See the [docs](http://chaijs.com/api/bdd/).

#### exists

```js
it('doesn\'t exist', function() {
    expect(target).to.not.be.undefined;
});
```

#### type

```js
it('should be a function', function() {
    expect(target).to.be.a('function');
});
```

#### function params

```js
it('should have two parameters', function() {
    expect(target).to.have.length(2);
});
```

#### function returns

```js
it('should add one to the number', function () {
    expect(addOne(1)).to.equal(2);
});
```

#### equals

```js
it('should be 42', function () {
    expect(target).to.equal(42);
});
```

#### deep equals (with objects or arrays)

```js
it('should be {a: 42}', function () {
    expect(target).to.deep.equal({a: 42});
});
```

#### regex

```js
it('should include the variable "count"', function () {
    var regex = new RegExp('count');
    var string = target.toString();
    expect(string.match(regex)).to.be.true;
});
```

```js
it('should access the property "prop"', function () {
    var regex1 = /\.prop/;            // dot notation
    var regex2 = /\[["']prop["']\]/;  // bracket notation
    var string = target.toString();
    var result = !!string.match(regex1) || !!string.match(regex2);
    expect(result).to.be.true;
});
```

#### spies

You can use [*sinon*](http://sinonjs.org/docs/) or [*chai-spies*](https://github.com/chaijs/chai-spies) to create a spy. See an example below:

`> npm i -s chai-spies`

```js
var chai = require('chai'),
    spies = require('chai-spies');
var expect = chai.expect;
    chai.use(spies);

var spy = chai.spy.on(console, 'log');
loadJS('04-forEach.js');

it('should write "hello world" to the console', function () {
    expect(spy).to.have.been.called.with('hello world');
});
```

### Dynamic Tests

There are situations where you might want to change data based on the current task. In this case, be careful, as all earlier tests must continue to pass.

Some variables are passed into the test runner through the node environment *process.env*.

See an example of dynamic data based on the task position below:

```js
var data = [1, 2, 3];

if (process.env.TASK_POSITION === '4') {
    data = [1, 2, 3, 4];
}
```

Tests can also change based on the task position.

```js
if (process.env.TASK_POSITION !== '4') {
    it('should do this', function () { ... });
} else {
    it('should to that', function () { ... });
}
```

See a full [example](https://github.com/coderoad/coderoad-functional-school/blob/master/tutorial/1/04/01-forEach.spec.js).

### Test Writing Tool

It's entirely possible to create a simplified testing tool that could make writing tests faster & easier.

The easiest solution would be to use editor snippets to generate a page of tests from a simple configuration object. This does not yet exist.

## Config

CodeRoad tutorial configurations can be set in the *package.json* config.

```json
{
  "config": {
      "testDir": "tutorial",
      "testSuffix": ".spec.js",
      "testRunner": "mocha-coderoad",
      "edit": true
  }
}
```

This section will likely expand in the future. For now, let's go over some of the configurations.

#### testDir

The relative path to the unit test directory. This makes writing unit tests paths easier.

#### testSuffix

The common suffix for unit tests. Also making writing unit test paths shorter.

#### testRunner

Specified test runner. Currently only "mocha-coderoad" is available.

#### edit

If set to true, *Atom-CodeRoad* will allow users to submit issues or submit markdown pull requests. You will also need to specify "repository" & "bugs" in your *package.json* file. See an [example config file](https://github.com/coderoad/coderoad-functional-school/blob/master/package.json).
