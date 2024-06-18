/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { configureStore } from "@reduxjs/toolkit";
import NavigationTabReducer from "../Components/WorkTabs/NavigationTabSlice";
import LogOverlayScreenReducer from "../Components/WorkTabs/Tabs/Logs/Options/LogOverlayScreenSlice";
import ContentFiltersReducer from "../Components/WorkTabs/Tabs/Contents/ContentFilters/FiltersSlice";
import playAssetReducer from "../Components/usePlayerFactory/utils/playAssetSlice";
import OverlayVisibleReducer from "../Components/PlaybackPanel/OverlayVisibleSlice";
import settingReducer from "../Components/usePlayerFactory/utils/setting-slice";
import VideoFullScreenReducer from "../Components/PlaybackPanel/VideoFullScreenSlice";
import FavouriteClipsReducer from "../Components/WorkTabs/Tabs/Contents/AssetView/FavouriteClipsSlice";
import ColorsModeReducer from "../Components/ColorsChanger/ColorsModeSlice";
import CustomCommonReducer from '../Components/WorkTabs/Tabs/Contents/AssetView/CustomCommonSlice'
import SubtitleOverlayReducer from "../Components/usePlayerFactory/utils/SubtitleOverlay";
import ChannelZappingReducer from '../Components/ChannelZapping/ChannelZappingSlice'
import LeftNavBarReducer from "../Components/LeftNavigationBar/LeftNavBarSlice";
import ConfirmationModalReducer from '../Components/ConfirmationModal/ConfirmationModalSlice'
import PreviewLoadingReducer from "../services/PreviewLoadingSlice";

function getAppStore() {
  return getAppStore.storeInstance
    ? getAppStore.storeInstance
    : (getAppStore.storeInstance = configureStore({
        reducer: {
          navigationTab: NavigationTabReducer,
          LogOverlayScreen: LogOverlayScreenReducer,
          ContentFilters: ContentFiltersReducer,
          playAsset: playAssetReducer,
          OverlayVisible: OverlayVisibleReducer,
          setting: settingReducer,
          VideoFullScreen: VideoFullScreenReducer,
          FavouriteClips: FavouriteClipsReducer,
          ColorsMode: ColorsModeReducer,
          CustomCommon: CustomCommonReducer,
          SubtitleOverlay: SubtitleOverlayReducer,
          ChannelZapping: ChannelZappingReducer,
          LeftNavBar: LeftNavBarReducer,
          ModalSlice: ConfirmationModalReducer,
          PreviewLoading: PreviewLoadingReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      }));
}

function dispatch(action) {
  return (dispatch.dispatcher ?? (dispatch.dispatcher = getAppStore().dispatch))(action);
}

function getState() {
  return getAppStore().getState();
}

export { getAppStore, dispatch, getState };
