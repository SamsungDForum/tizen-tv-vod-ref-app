declare namespace dashjs {
  export interface RangeController {
    initialize(rs: object[]): void;
    reset(): void;
    isEnabled(): boolean;
  }
}