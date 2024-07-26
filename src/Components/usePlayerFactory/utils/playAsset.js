/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useSelector } from "react-redux";
import { dispatch } from "../../../reduxStore/store";
import { setAction, storeAsset, playbackTime } from "./playAssetSlice";

export function setMedia(media) {
  dispatch(setAction.media(media));
}

export function setAudioLanguage(track) {
  dispatch(setAction.audioLanguage(track));
}

export function setSubtitleLanguage(track) {
  dispatch(setAction.subtitleLanguage(track));
}

export function setVideoQuality(track) {
  dispatch(setAction.videoQuality(track));
}

export function setKeySystem(keySystem) {
  dispatch(setAction.keySystem(keySystem));
}

export function unuseMediaBundle() {
  dispatch(setAction.reset());
}

/**
 * Store media asset in session storage.
 * @param {number} playbackTime
 */
export function store(playbackTime) {
  storeAsset(playbackTime);
}

/**
 * "Destructive" read of playback time. Once read, stored playback time is
 * set to null.
 * @returns {number}
 */
export function getPlaybackTime() {
  const time = playbackTime();
  return time ? time : 0;
}
