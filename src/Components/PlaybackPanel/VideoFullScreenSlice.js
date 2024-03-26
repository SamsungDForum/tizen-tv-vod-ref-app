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
