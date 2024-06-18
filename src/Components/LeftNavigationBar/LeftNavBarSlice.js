/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

export const LeftNavBar = createSlice({
  name: "LeftNavBar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setIsLeftBarOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsLeftBarOpen } = LeftNavBar.actions;

export default LeftNavBar.reducer;
