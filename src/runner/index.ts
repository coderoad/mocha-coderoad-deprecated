import startRunner from './start-runner';
import spawnRunnerProcess from './runner-process';

export default function runner({dir, taskPosition, handleResult, testPath}) {
    const runner = spawnRunnerProcess({dir, taskPosition, testPath});
    return startRunner({runner, handleResult, taskPosition});
}
