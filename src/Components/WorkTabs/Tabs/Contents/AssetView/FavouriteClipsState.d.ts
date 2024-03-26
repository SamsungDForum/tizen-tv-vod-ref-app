import { Media } from "../../../../usePlayerFactory/utils/playAssetCurrentTypes";

declare module "redux-states" {
  export interface FavouriteClipsState {
    myClips: Array<Media>;
    quickAdd: boolean; 
  }
}