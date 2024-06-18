/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

export const BitmovinSubtitles = createSlice({
  name: "BitmovinSubtitles",
  initialState: {
    value: ''
  },
  reducers: {
    setSubtitles: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSubtitles } = BitmovinSubtitles.actions;

export default BitmovinSubtitles.reducer;
