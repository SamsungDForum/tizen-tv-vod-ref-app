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
