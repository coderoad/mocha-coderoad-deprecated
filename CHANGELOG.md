# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.10.0] - 2016-08-14
- break test runner into two parts:
  - load - called when a new page is set, prepares a test file
  - run - called on test run, compiles the test file with user code
- create ["js-coderoad"](https://github.com/coderoad/js-coderoad) package for js specific test features

## [0.9.3] - 2016-08-01
- add "exists" global file path checker
- upgrade to mocha@3.0.0
- set "node_modules" to user project directory
- compile JS code to ES5 using the TypeScript compiler
- allows for both ES6 & TypeScript input

## [0.8.0] - 2016-06-28
- load with object

## [0.7.0] - 2016-05-23
- improved console logger

## [0.6.0] - 2016-04-01
- loaders are now internal to Atom-Coderoad

## [0.5.7] - 2016-03-31
- log objects and arrays using `console.dir`
- remove babel dependency

## [0.5.4] - 2016-03-20
- fix: normalize path issue on Linux

## [0.5.3] - 2016-03-13
- `loadEditor` for loading editor files
- `loadGlobal` for loading global data

## [0.5.1] - 2016-03-11
- optimizations
- handle older NPM versions
- fix for Windows

## [0.5.0] - 2016-02-29
- return `result.completed`: boolean, if all tests pass

## [0.4.4] - 2016-02-26
- *snippets.cson*, for quickly generating tests
