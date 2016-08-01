import {join} from 'path';

// test results are taken after this signal
// this helps to avoid parsing console.logs before the output
export const signal = '@@@CodeRoad Results@@@';

// location for a temporary test file
// which combines user code with helper functions
export const testPath = join(__dirname, '.tmp.js');
