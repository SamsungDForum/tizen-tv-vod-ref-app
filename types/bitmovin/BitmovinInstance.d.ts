declare namespace bitmovin {
  export interface BitmovinInstance {
    [index: string]: any;
    on(type: MediaPlayerEvent, callback: (...args: any[]) => void): void;
    on(type: 'audiochanged', callback: Events.AudioChangedCallback): void;
    on(type: 'videoqualitychanged', callback: Events.VideoQualityChangedCallback): void;
  }
}

