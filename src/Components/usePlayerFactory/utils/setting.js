/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useSelector } from "react-redux";
import { dispatch, getState } from "../../../reduxStore/store";
import { setSetting, valueDefault, store, valueOf } from "./setting-slice";
import { setSubtitles } from "./SubtitleOverlay";

function toggleSettingPanel() {
  return dispatch(setSetting.toggleSettingPanel());
}

function sourcePending(source) {
  return dispatch(setSetting.sourcePending(source));
}

function sourceUnmount() {
  return dispatch(setSetting.sourceUnmount());
}

function audio({ current, list }) {
  return dispatch(setSetting.audio({ current: current, list: list }));
}

function subtitle({ current, list }) {
  return dispatch(setSetting.subtitle({ current: current, list: list }));
}

function videoQuality({ current, list }) {
  return dispatch(setSetting.videoQuality({ current: current, list: list }));
}

function keySystem({ current, list }) {
  return dispatch(setSetting.keySystem({ current: current, list: list }));
}

function setSubtitleOverlay(text) {
  return dispatch(setSubtitles(text));
}

function useSetting(selector = valueOf.setting, equalityFn = undefined) {
  return useSelector(selector, equalityFn);
}

function getSetting(selector = valueOf.setting) {
  return selector(dispatch(getState));
}

export {
  toggleSettingPanel,
  sourcePending,
  sourceUnmount,
  audio,
  subtitle,
  videoQuality,
  keySystem,
  setSubtitleOverlay,
  store,
  useSetting,
  valueDefault,
  valueOf,
  getSetting,
};
