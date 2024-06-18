/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

const savedColorMode = localStorage.getItem("colorMode");
const colorModeValue = savedColorMode ? JSON.parse(savedColorMode) : "Dark";

export const ColorsMode = createSlice({
  name: "ColorsMode",
  initialState: {
    value: colorModeValue,
  },
  reducers: {
    setColorsMode: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("colorMode", JSON.stringify(action.payload));
    },
  },
});

export const { setColorsMode } = ColorsMode.actions;

export default ColorsMode.reducer;
