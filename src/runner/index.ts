import startRunner from './start-runner';
import spawnRunnerProcess from './runner-process';

export default function runner(options) {
    const runner = spawnRunnerProcess(options);
    return startRunner(runner, options.handleResult);
}
