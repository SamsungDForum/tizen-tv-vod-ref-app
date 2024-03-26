import { createSlice } from "@reduxjs/toolkit";

export const SubtitleOverlay = createSlice({
  name: "SubtitleOverlay",
  initialState: {
    value: ''
  },
  reducers: {
    setSubtitles: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSubtitles } = SubtitleOverlay.actions;

export default SubtitleOverlay.reducer;
