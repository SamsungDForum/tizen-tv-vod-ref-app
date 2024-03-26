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
