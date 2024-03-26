declare namespace dashjs {
  export interface IManifestInfo {
    dvrWindowSize: number;
    availableFrom: Date;
    duration: number;
    isDynamic: boolean;
    loadedTime: Date;
    maxFragmentDuration: number;
    minBufferTime: number;
    serviceDescriptions: object[]
    protocol?: string;
  }
}