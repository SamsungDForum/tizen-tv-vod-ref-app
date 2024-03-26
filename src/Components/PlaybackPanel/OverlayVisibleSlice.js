import { createSlice } from "@reduxjs/toolkit";

export const OverlayVisible = createSlice({
  name: "OverlayVisible",
  initialState: {
    value: false,
  },
  reducers: {
    setOverlayIsVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOverlayIsVisible } = OverlayVisible.actions;

export default OverlayVisible.reducer;
