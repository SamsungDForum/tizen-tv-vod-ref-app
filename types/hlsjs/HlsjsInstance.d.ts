declare namespace hlsjs {
  export interface HlsjsInstance {
    [index: string]: any;
    on(type: MediaPlayerEvent, callback: (event: MediaPlayerEvent, data: any) => void): void;
  }
}
