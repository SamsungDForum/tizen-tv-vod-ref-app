declare namespace dashjs {
  export interface MetricsReporting {
    createMetricsReporting(config: object): void;
    getReportingFactory(): ReportingFactory;
    getMetricsHandlerFactory(): MetricsHandlerFactory;
    getClassName(): 'MetricsReporting';
  }
}
