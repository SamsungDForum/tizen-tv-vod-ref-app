declare namespace dashjs.Events {
  interface QualityChangeRenderedEvent {
    mediaType: MediaType;
    newQuality: number;
    oldQuality: number;
    streamId: string;
    type: 'qualityChangeRendered';
  }

 export type QualityChangeRenderedCallback = (event: QualityChangeRenderedEvent) => void;
}
