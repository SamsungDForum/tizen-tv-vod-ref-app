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
