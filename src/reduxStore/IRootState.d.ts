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
  type PreviewLoadingState
} from 'redux-states';

declare module 'react-redux' {  
  export interface IRootState {
    navigationTab: NavigationTabState;
    LogOverlayScreen: LogOverlayScreenState;
    ContentFilters: FiltersState;
    playAsset: PlayAssetState;
    OverlayVisible: OverlayVisibleState;
    settings: SettingState;
    VideoFullScreen: VideoFullScreenState;
    FavouriteClips: FavouriteClipsState;
    ColorsMode: ColorsModeState;
    CustomCommon: CustomCommonState;
    BitmovinSubtitles: BitmovinSubtitlesState;
    ChannelZapping: ChannelZappingState;
    LeftNavBar: LeftNavBarState;
    ModalSlice: ConfirmationModalState;
    PreviewLoading: PreviewLoadingState;
  }
}