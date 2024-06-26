/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

const isCustomCommonList = JSON.parse(localStorage.getItem("CustomCommon"))?.isCustomCommon;
const CustomCommonList = JSON.parse(localStorage.getItem("CustomCommon"))?.myCustomCommon;

export const isCustomCommon = isCustomCommonList ? JSON.parse(isCustomCommonList) : false;

export const CustomCommon = createSlice({
  name: "CustomCommon",
  initialState: {
    isCustomCommon: isCustomCommon,
    myCustomCommon: isCustomCommon && CustomCommonList ? CustomCommonList : [],
  },

  reducers: {
    toggleCustomCommon: (state, action) => {
      if (!action.payload) {
        state.myCustomCommon = [];
      }
      state.isCustomCommon = action.payload;
      localStorage.setItem("CustomCommon", JSON.stringify({ ...state, isCustomCommon: action.payload }));
    },
    setCustomCommonList: (state, action) => {
      const savedFavClipState = JSON.parse(localStorage.getItem("favClipsState"));
      state.myCustomCommon = savedFavClipState;
      localStorage.setItem("CustomCommon", JSON.stringify({ ...state, myCustomCommon: savedFavClipState }));
    },
  },
});

export const { toggleCustomCommon, setCustomCommonList } = CustomCommon.actions;

export default CustomCommon.reducer;
