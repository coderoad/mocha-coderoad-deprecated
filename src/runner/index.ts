import startRunner from './start-runner';
import spawnRunnerProcess from './runner-process';

const isWindows = window.navigator.appVersion.indexOf('Win') > -1;

export default function runner({dir, taskPosition, handleResult, testPath}) {

  if (isWindows) {
    testPath = testPath.split('\\').join('\\\\');
    testPath = testPath.split('/').join('\\\\');
  }

  const runner = spawnRunnerProcess({dir, taskPosition, testPath});
  return startRunner({runner, handleResult, taskPosition});
}
