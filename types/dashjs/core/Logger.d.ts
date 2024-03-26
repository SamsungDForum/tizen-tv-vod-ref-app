declare namespace dashjs {
  interface Logger {
    debug(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
    error(...params: any[]): void;
    fatal(...params: any[]): void;
  }
}