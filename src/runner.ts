import {signal} from './utils';
import {createRunner} from './create-runner';

interface Result {
  msg: string;
  taskPosition: number;
  pass: boolean;
  change: number;
  failedAtFile?: string;
  body?: string;
  timedOut?: boolean;
  duration?: number;
};

export default function runner(testFile, config: Config, handleResult, handleLog) {

  let runner = createRunner(config, testFile);
  var final = null;
  let signalMatch = new RegExp(signal);

  return new Promise((resolve, reject) => {
    runner.stdout.on('data', function(data): void {

      data = data.toString();
      // parse only final output data
      let match = signalMatch.exec(data); // 0

      if (!match) {
        handleLog(data);
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

      if (!result.pass) {
        // fail: return first failure
        final = result.failures[0];
      } else {
        // pass
        final = result.passes[result.passes.length - 1];
      }

      final.change = final.taskPosition - config.taskPosition;
      final.pass = final.change > 0;
      // return result to atom-coderoad
      handleResult(final);
    });

    runner.stderr.on('data', function(data) {
      console.log('test error', data.toString());
    });

    runner.on('close', function(code) {
      if (code === 0) {
        resolve(final);
      } else {
        resolve(final);
      }
    });
  });
}
