/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

export const tabsEnum = {
  allClips: "All Clips",
  favoriteClips: "Favorite Clips",
  logsMessages: "Logs Messages",
  advanced: "Advanced",
};
export const tabs = [tabsEnum.allClips, tabsEnum.favoriteClips, tabsEnum.logsMessages, tabsEnum.advanced];

export const selectNavigationTab = createSlice({
  name: "selectNavigationTab",
  initialState: {
    value: "All Clips",
  },
  reducers: {
    setNavigationTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNavigationTab } = selectNavigationTab.actions;

export default selectNavigationTab.reducer;
