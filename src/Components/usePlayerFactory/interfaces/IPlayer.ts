import type { Audio, Media, Quality, Subtitle, KeySystem } from "../utils/playAssetCurrentTypes";

interface IPlayer {
  setAsset(media: Media, keySystem?: KeySystem): void;
  changeCurrentAudio(audio: Audio): void;
  changeCurrentVideoQuality(quality: Quality): void;
  changeCurrentSubtitles(subtitles: Subtitle): void;
}

export type { IPlayer };