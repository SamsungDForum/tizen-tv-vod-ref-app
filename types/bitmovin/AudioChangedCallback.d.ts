declare namespace bitmovin.Events {
  type AudioPrefix<Str extends string> = `audio/${Str}`;

  interface AudioInfo {
    getQualities: () => object;
    id: AudioPrefix<string>;
    label: string;
    lang: string;
    role: undefined | Array<{
      schemeIdUri: string;
      value: string;
    }>
  }

  interface AudioChangedEvent {
    type: Extract<MediaPlayerEvent, 'audiochanged'>;
    time: number;
    timestamp: number;
    sourceAudio: AudioInfo;
    targetAudio: AudioInfo;
  }

  export type AudioChangedCallback = (event: AudioChangedEvent) => void;
}