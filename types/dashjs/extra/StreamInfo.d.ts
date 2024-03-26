declare namespace dashjs {
  export type StreamInfo = {
    id: string;
    index: number;
    start: number;
    duration: number;
    manifestInfo: IManifestInfo;
    isLast: boolean;
  }
}