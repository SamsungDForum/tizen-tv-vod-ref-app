declare namespace dashjs {
  export interface OfflineController {
    [key: string]: any;
    stopRecord(id: string): void;
    resetRecords(): void;
    resumeRecord(id: string): void;
    deleteRecord(id: string): void;
    startRecord(id: string, mediaInfos: MediaInfo[]);
  }
}