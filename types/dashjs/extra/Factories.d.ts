declare namespace dashjs {
  export interface Factory<T = any> {
    create: () => T;
  }

  export interface SingletonFactory<T = any> {
    getInstance: () => T;
  }

  export interface ReportingFactory {
    create(entry: object, reportingController: ReportingController): void;
    register(schemeIdUri: string, moduleName: string): void;
    unregister(schemeIdUri: string): void;
  }

  export interface MetricsHandlerFactory {
    create(listType: string, reportingController: ReportingController): void;
    register(key: string, handler: object): void;
    unregister(key: string): void;
  }
}