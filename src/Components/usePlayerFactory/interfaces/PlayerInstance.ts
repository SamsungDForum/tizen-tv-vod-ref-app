type PlayerInstance = 
  | bitmovin.BitmovinInstance 
  | dashjs.MediaPlayerClass 
  | hlsjs.HlsjsInstance 
  | shaka.ShakaInstance;

export type { PlayerInstance };