/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

export const VideoFullScreen = createSlice({
  name: "VideoFullScreen",
  initialState: {
    value: false,
  },
  reducers: {
    setVideoFullScreenOn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setVideoFullScreenOn } = VideoFullScreen.actions;

export default VideoFullScreen.reducer;
