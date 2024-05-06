declare module "redux-states" {
  export interface PreviewLoadingState {
    value: {
      queue: Array<number>;
      loadingState: 'success' | 'failure' | 'loading' | 'hidden';
    }
  }
}