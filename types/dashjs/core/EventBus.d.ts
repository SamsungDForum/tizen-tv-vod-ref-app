declare namespace dashjs {
  interface EventBus {
    on(type: string, listener: any, scope: any, options?: object): void;
    off(type: string, listener: any, scope: any): void;
    trigger(type: string, payload?: object, filters?: object): void;
    reset(): void;
  }
}