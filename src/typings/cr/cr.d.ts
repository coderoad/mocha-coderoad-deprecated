declare module CR {

interface TestResult {
    pass: boolean;
    taskPosition: number;
    msg?: string;
    timedOut?: boolean;
    change: number;
    completed: boolean;
  }

  interface Config {
    dir: string;
    package?: string;
    runner?: string;
    tutorial?: string;
    tutorialDir?: string;
    runnerOptions?: Object;
    issuesPath?: string;
    repo?: string;
    edit?: boolean;
    run?: any;
    taskPosition?: number;
  }

}

interface Process {
  resourcesPath: string;
}
