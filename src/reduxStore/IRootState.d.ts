/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  type NavigationTabState,
  type LogOverlayScreenState,
  type FiltersState,
  type PlayAssetState,
  type OverlayVisibleState,
  type SettingState,
  type VideoFullScreenState,
  type FavouriteClipsState,
  type ColorsModeState,
  type CustomCommonState,
  type BitmovinSubtitlesState,
  type ChannelZappingState,
  type LeftNavBarState,
  type ConfirmationModalState,
  type PreviewLoadingState,
  type SubtitleOverlayState,
  type ChartConfigState,
} from "redux-states";

declare module "react-redux" {
  export interface IRootState {
    navigationTab: NavigationTabState;
    LogOverlayScreen: LogOverlayScreenState;
    ContentFilters: FiltersState;
    playAsset: PlayAssetState;
    OverlayVisible: OverlayVisibleState;
    setting: SettingState;
    VideoFullScreen: VideoFullScreenState;
    FavouriteClips: FavouriteClipsState;
    ColorsMode: ColorsModeState;
    CustomCommon: CustomCommonState;
    BitmovinSubtitles: BitmovinSubtitlesState;
    ChannelZapping: ChannelZappingState;
    LeftNavBar: LeftNavBarState;
    ModalSlice: ConfirmationModalState;
    PreviewLoading: PreviewLoadingState;
    SubtitleOverlay: SubtitleOverlayState;
    ChartConfig: ChartConfigState;
  }
}
