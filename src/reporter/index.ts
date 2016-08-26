import { signal } from '../constants';

exports = module.exports = reporter;
function reporter(runner) {
  let result = {
    passes: [],
    failures: [],
    pass: true,
  };

  runner.on('pass', (test: Mocha.ITest) => {
    const {index} = getIndexAndTitle(test.fullTitle());
    // add pass
    result.passes.push({
      msg: `Task ${index} Complete`,
      taskPosition: index,
    });
  });

  runner.on('fail', (test: Mocha.ITest, err: Error) => {
    const {msg, index} = getIndexAndTitle(test.fullTitle());
    // add fail
    result.failures.push({
      msg,
      taskPosition: index - 1,
      // body: test.body,
      timedOut: test.timedOut,
      // duration: test.duration
    });
    result.pass = false;
  });

  runner.on('end', function() {
    // anything before the signal will be captured as log
    process.stdout.write(signal + JSON.stringify(result, null, 2));
  });
}

interface IndexTitle {
  index: number;
  msg: string;
}

function getIndexAndTitle(title: string): IndexTitle {
  // tests prefixed with task number: "01 title"
  const indexString = title.match(/^[0-9]+/);
  if (!indexString) {
    throw 'Tests should begin with a number, indicating the task number';
  }
  return {
    index: parseInt(indexString[0], 10),
    msg: title.slice(indexString[0].length + 1),
  };
}
