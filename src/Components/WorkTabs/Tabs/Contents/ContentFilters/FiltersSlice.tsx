/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../../../../../reduxStore/store";
import { useTypedSelector } from "../../../../../reduxStore/useTypedSelector";
import { storeSession, sessionRestore } from "../../../../../../libs/re-store";

export const FilterEnums = {
  SRC: {
    ALL: "ALL",
    AZURE: "amssamples.streaming.mediaservices.windows.net",
    AKAMAI: ".akamai",
    DASH_IF: ".dashif",
    PARIS: "download.tsi.telecom-paristech.fr",
    VERIZON: "content.uplynk.com",
  },
  DRM: {
    ALL: "ALL",
    NONE: "NONE",
    Playready: "com.microsoft.playready",
    Clearkey: "org.w3.clearkey",
    Widevine: "com.widevine.alpha",
  },
  Container: { ALL: "ALL", MP4: "MP4", WEBM: "WEBM", Containerless: "Containerless" },
  Manifest: { ALL: "ALL", DASH: "DASH", HLS: "HLS", MSS: "MSS" },
} as const;

export const FilterLabels = {
  SRC: {
    ALL: "All",
    AZURE: "Azure",
    AKAMAI: "Akamai",
    DASH_IF: "DASH-IF",
    PARIS: "Telecom Paris",
    VERIZON: "Verizon",
  },
  DRM: {
    ALL: "All",
    NONE: "No DRM",
    Playready: "Play Ready",
    Clearkey: "Clear Key",
    Widevine: "Widevine",
  },
  Container: { ALL: "All", MP4: "Mp4", WEBM: "Webm", Containerless: "Containerless" },
  Manifest: { ALL: "All", DASH: "DASH", HLS: "HLS", MSS: "MSS" },
} as const;

export const filterBy = {
  source: "SRC",
  drm: "DRM",
  container: "Container",
  manifest: "Manifest",
} as const;

export const filtersDefault = {
  [filterBy.source]: FilterEnums.SRC.ALL,
  [filterBy.drm]: FilterEnums.DRM.ALL,
  [filterBy.container]: FilterEnums.Container.ALL,
  [filterBy.manifest]: FilterEnums.Manifest.ALL,
};

export const ContentFilters = createSlice({
  name: "ContentFilters",
  initialState: { value: sessionRestore("contentfilters", filtersDefault) },
  reducers: {
    setFilters: (state, action) => {
      state.value = action.payload;
    },
  },
});

export function store(filters) {
  storeSession("contentfilters", filters);
  dispatch(setFilters(filters));
}

export function restore() {
  return useTypedSelector(state => state.ContentFilters.value);
}

export const { setFilters } = ContentFilters.actions;
export default ContentFilters.reducer;
