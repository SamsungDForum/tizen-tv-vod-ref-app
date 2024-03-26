import { Media } from "../../../../usePlayerFactory/utils/playAssetCurrentTypes";

declare module "redux-states" {
  export interface CustomCommonState {
    isCustomCommon: boolean;
    myCustomCommon: Array<Media>;
  }
}