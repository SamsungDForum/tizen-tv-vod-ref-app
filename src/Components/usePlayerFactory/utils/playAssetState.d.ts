import { 
  type Audio,
  type KeySystem,
  type Media,
  type Quality,
  type Subtitle
} from "./playAssetCurrentTypes";

declare module "redux-states" {
  export interface PlayAssetState {
    value: {
      audio?: Audio;
      keySystem?: KeySystem;
      media?: Media;
      quality?: Quality;
      subtitle?: Subtitle;
    }
    playbackTime: number | null;
  }
}