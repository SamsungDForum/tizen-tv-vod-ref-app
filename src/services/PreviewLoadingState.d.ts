declare module "redux-states" {
  export interface PreviewLoadingState {
    queue: Array<number>;
    loadingState: 'success' | 'failure' | 'loading' | 'hidden';
  }
}