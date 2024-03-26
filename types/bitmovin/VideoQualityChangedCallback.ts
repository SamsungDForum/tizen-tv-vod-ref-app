declare namespace bitmovin.Events {
  interface QualityInfo {
    bitrate: number;
    codec: string;
    height: number;
    id: string;
    label: string;
    width: number;
  }

  interface VideoQualityChangedEvent {
    type: Extract<MediaPlayerEvent, 'videoqualitychanged'>;
    timestamp: number;
    targetQualityId: string;
    sourceQualityId: string;
    sourceQuality: QualityInfo;
    targetQuality: QualityInfo;
  }

  export type VideoQualityChangedCallback = (event: VideoQualityChangedEvent) => void; 
}