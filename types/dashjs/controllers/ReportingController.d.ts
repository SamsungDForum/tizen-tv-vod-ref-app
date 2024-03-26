declare namespace dashjs {
  export interface ReportingController {
    initialize(rangeController: RangeController): void;
    reset(): void;
    report(type: string, vos: any[]): void;
  }
}