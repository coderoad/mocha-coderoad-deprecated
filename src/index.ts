import {signal} from './constants';
import runnerProcess from './runner-process';
import writeTest from './write-test';
import {parseLog} from 'process-console-log';

export default function runner(
  testString: string,
  config: CR.Config,
  handleResult: (result) => CR.TestResult
) {
  // write tests to file
  writeTest(testString);
  // run tests on file
  const runner = runnerProcess(config);

  var final = null;
  const signalMatch = new RegExp(signal);

  return new Promise(function run(resolve, reject) {

    runner.stdout.on('data', function onData(data): void {
      data = data.toString();
      // parse only final output data
      let match = signalMatch.exec(data); // 0

      if (!match) {
        try {
          // console.log(data);
          parseLog(data);
        } catch (e) {
          // console.log(data);
          parseLog(data);
        }
        return;
      }

      /* Result */
      // transform string result into object
      let resultString = data.substring(match.index + signal.length);
      let result = JSON.parse(JSON.stringify(resultString));
      // why parse twice? I don't know, but it works
      if (typeof result === 'string') {
        result = JSON.parse(result);
      }

      if (result.pass) {
        // pass
        final = result.passes[result.passes.length - 1];
      } else if (result.pass === false) {
        // fail: return first failure
        final = result.failures[0];
      } else {
        console.log('error processing result: ', result);
      }

      final.change = final.taskPosition - config.taskPosition;
      final.pass = final.change > 0;
      final.completed = result.pass;

      // return result to atom-coderoad
      handleResult(final);
    });

    runner.stderr.on('data', function onError(data) {
      console.log('test error', data.toString());
    });

    runner.on('close', function onClose(code: number) {
      // if (code === 0) {
      //   resolve(final);
      // } else {
      resolve(final);
      // }
    });
  });
}
