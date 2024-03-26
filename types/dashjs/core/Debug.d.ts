declare namespace dashjs {
  export type Debug = {
    getLogger(): Logger;
    getClassName?(): string;
    setLogTimestampVisible(value: boolean): void;
    setCalleeNameVisible?(value: boolean): void;
  }
}