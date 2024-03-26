import { createSlice } from "@reduxjs/toolkit";
import { getState, dispatch } from "../../../reduxStore/store";
import { storeSession, sessionRestore } from "../../../../libs/re-store";

const AssetType = {
  media: "media",
  audioLanguage: "audio",
  subtitleLanguage: "subtitle",
  videoQuality: "quality",
  keySystem: "keySystem",
};

const playAssetName = "playAsset";
const assetDefault = {
  value: {
    [AssetType.media]: undefined,
    [AssetType.audioLanguage]: undefined,
    [AssetType.subtitleLanguage]: undefined,
    [AssetType.videoQuality]: undefined,
    [AssetType.keySystem]: undefined,
  },
  playbackTime: null,
};

// TODO: Review
// drop use on toolkit's immer reducers
// https://redux-toolkit.js.org/usage/immer-reducers
// in favour of pure redux reducers.
export const playAsset = createSlice({
  name: playAssetName,
  initialState: (() => {
    const assetState = Object(assetDefault);
    const restoredState = sessionRestore(playAssetName);

    if (restoredState) {
      if (restoredState.playbackTime) {
        assetState.playbackTime = restoredState.playbackTime;
      }
      if (restoredState.value && restoredState.value[AssetType.media]) {
        assetState.value[AssetType.media] = { ...restoredState.value[AssetType.media] };
      }
    }

    return assetState;
  })(),
  reducers: {
    reset: function reset(state, _) {
      state.value[AssetType.media] =
        state.value[AssetType.audioLanguage] =
        state.value[AssetType.subtitleLanguage] =
        state.value[AssetType.videoQuality] =
        state.value[AssetType.keySystem] =
          undefined;
    },
    media: function media(state, action) {
      state.value[AssetType.media] = action.payload;
      state.value[AssetType.keySystem] = undefined;
    },
    audioLanguage: function audioLanguage(state, action) {
      state.value[AssetType.audioLanguage] = action.payload;
    },
    subtitleLanguage: function subtitleLanguage(state, action) {
      state.value[AssetType.subtitleLanguage] = action.payload;
    },
    videoQuality: function videoQuality(state, action) {
      state.value[AssetType.videoQuality] = action.payload;
    },
    keySystem: function keySystem(state, action) {
      state.value[AssetType.keySystem] = action.payload;
    },
    clearPlaybackTime: function playbackTime(state, action) {
      state.playbackTime = null;
    },
  },
});

export default playAsset.reducer;

/**
 * Internal implementation of asset store in session memory.
 * @param {Number} playbackTime
 */
export function storeAsset(playbackTime) {
  const asset = {
    value: {
      [AssetType.media]: { ...getState().playAsset.value.media },
    },
    playbackTime: playbackTime,
  };

  storeSession(playAssetName, asset);
}

/**
 * Retrieves playback time from playAsset store.
 * playback time is nullified upon read.
 * @returns {number|null}
 */
export function playbackTime() {
  /** @type {number|null} */
  const pt = getState().playAsset.playbackTime;
  if (pt != null) {
    dispatch(playAsset.actions.clearPlaybackTime());
  }
  return pt;
}

const { actions } = playAsset;
export { actions as setAction };
