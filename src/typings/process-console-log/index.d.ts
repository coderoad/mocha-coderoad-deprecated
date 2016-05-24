declare module 'process-console-log' {
  export function parseLog(logged: {type: string, output: any}[]): void;
  export function initProcessLogger(): void;
  export const logger: string;
}
