import { parseLog } from 'process-console-log';
import { signal } from '../constants';

// take code after the signal to avoid confusing console.log statements
// with test output
const signalMatch = new RegExp(signal);

export default function startRunner({runner, handleResult, taskPosition}) {

  var final = null;

  new Promise(function run(resolve, reject) {

    runner.stdout.on('data', function onData(data): void {
      data = data.toString();
			// parse only final output data
      let match = signalMatch.exec(data); // 0

      if (!match) {
        try {
          parseLog(data);
        } catch (e) {
          final.error = true;
          parseLog(data);
        }
        return;
      }

			/* Result */
			// transform string result into object
      let resultString = data.substring(match.index + signal.length);
      let result = JSON.parse(JSON.stringify(resultString));
			// why parse twice? it works
      if (typeof result === 'string') {
        result = JSON.parse(result);
      }

      switch (result.pass) {
        case true:
        final = result.passes[result.passes.length - 1];
        break;
        case false:
        final = result.failures[0];
        break;
        default:
        console.log('error processing result: ', result);
      }

      final.change = final.taskPosition - taskPosition;
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
