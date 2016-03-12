import {signal} from './utils';

exports = module.exports = reporter;
function reporter(runner) {
  let result = {
    passes: [],
    failures: [],
    pass: true
  };

  runner.on('pass', function(test: Mocha.ITest) {
    let title = test.fullTitle();
    let obj = getIndexAndTitle(title);
    // add pass
    result.passes.push({
      msg: `Task ${obj.index} Complete`,
      taskPosition: obj.index
    });
  });

  runner.on('fail', function(test: Mocha.ITest, err: Error) {
    let title = test.fullTitle();
    let obj = getIndexAndTitle(title);
    // add fail
    result.failures.push({
      msg: obj.msg,
      taskPosition: obj.index - 1,
      // body: test.body,
      timedOut: test.timedOut
      // duration: test.duration
    });
    result.pass = false;
  });

  runner.on('end', function() {
    // anything before the signal will be captured as log
    process.stdout.write(signal + JSON.stringify(result, null, 2));
  });

  function getIndexAndTitle(title: string): { index: number, msg: string } {
    // tests prefixed with task number: "01 title"
    let indexString = title.match(/^[0-9]+/);
    if (!indexString) {
      throw 'Tests should begin with a number, indicating the task number';
    }
    return {
      index: parseInt(indexString[0], 10),
      msg: title.slice(indexString[0].length + 1)
    };
  }

}
