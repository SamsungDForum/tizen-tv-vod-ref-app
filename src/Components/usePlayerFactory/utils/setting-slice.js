/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";
import { trackEqual } from "./track";
import { defaultPlayer } from "../../../../configs/player";
import { storeSession, sessionRestore } from "../../../../libs/re-store";
import { getState, dispatch } from "../../../reduxStore/store";

const valueDefault = {
  source: defaultPlayer(),
  settingPanel: false,
  audio: "default",
  subtitle: "off",
  videoQuality: "auto",
  keySystem: "no drm",
};

const setting = {
  source: "source",
  settingPanel: "settingPanel",
  audio: "audio",
  subtitle: "subtitle",
  videoQuality: "videoQuality",
  keySystem: "keySystem",
};

const settingDefault = {
  [setting.source]: { current: valueDefault.source },
  [setting.settingPanel]: valueDefault.settingPanel,
  [setting.audio]: { current: valueDefault.audio, list: [] },
  [setting.subtitle]: { current: valueDefault.subtitle, list: [valueDefault.subtitle] },
  [setting.videoQuality]: { current: valueDefault.videoQuality, list: [valueDefault.videoQuality] },
  [setting.keySystem]: { current: valueDefault.keySystem, list: [] },
};

const settingSlice = createSlice({
  name: "setting",
  initialState: sessionRestore("setting", settingDefault),
  reducers: {
    [toggleSettingPanel.name]: toggleSettingPanel,
    [sourcePending.name]: sourcePending,
    [sourceUnmount.name]: sourceUnmount,
    [audio.name]: audio,
    [subtitle.name]: subtitle,
    [videoQuality.name]: videoQuality,
    [keySystem.name]: keySystem,
  },
});

const valueOf = {
  ["setting"]: (state) => state.setting,
  [setting.source]: (state) => state.setting.source,
  [setting.settingPanel]: (state) => state.setting.settingPanel,
  [setting.audio]: (state) => state.setting.audio,
  [setting.subtitle]: (state) => state.setting.subtitle,
  [setting.videoQuality]: (state) => state.setting.videoQuality,
  [setting.keySystem]: (state) => state.setting.keySystem,
};

function store(convertFn) {
  storeSession(
    "setting",
    convertFn ? convertFn(dispatch(() => getState().setting)) : dispatch(() => getState().setting)
  );
}

function toggleSettingPanel(state) {
  return { ...state, settingPanel: !state.settingPanel };
}

function sourcePending(state, { payload: source }) {
  localStorage.setItem('recentPlayer', JSON.stringify(source))

  return state.source.current && !trackEqual(state.source.current, source)
    ? { ...state, source: { pending: { ...source } } }
    : state;
    
}

function sourceUnmount(state) {
  return { ...state, source: { reload: state.source.pending } };
}

function audio(state, { payload: { current, list } }) {
  const next = { ...state, audio: { ...state.audio } };
  if(current) {
    if(typeof current === "string") {
      next.audio.current = current;
    } else {
      next.audio.current = { ...current };
    }
  }
  list && (next.audio.list = [...list]);

  return next;
}

function subtitle(state, { payload: { current, list } }) {
  const next = { ...state, subtitle: { ...state.subtitle } };
  if(current) {
    if(typeof current === "string") {
      next.subtitle.current = current;
    } else {
      next.subtitle.current = { ...current };
    }
  }
  list && (next.subtitle.list = [...settingDefault.subtitle.list, ...list]);

  return next;
}

function videoQuality(state, { payload: { current, list } }) {
  const next = { ...state, videoQuality: { ...state.videoQuality } };
  if(current) {
    if(typeof current === "string") {
      next.videoQuality.current = current;
    } else {
      next.videoQuality.current = { ...current };
    }
  }
  list && (next.videoQuality.list = [...settingDefault.videoQuality.list, ...list]);

  return next;
}

function keySystem(state, { payload: { current, list } }) {
  const next = { ...state, keySystem: { ...state.keySystem } };
  if(current) {
    if(typeof current === "string") {
      next.keySystem.current = current;
    } else {
      next.keySystem.current = { ...current };
    }
  } else {
    next.keySystem.current = settingDefault.keySystem.current;
  }
  next.keySystem.list = list ? [...list] : settingDefault.keySystem.list;

  return next;
}

export default settingSlice.reducer;
export { valueDefault, setting, store, valueOf, settingDefault };
export const { actions: setSetting } = settingSlice;
