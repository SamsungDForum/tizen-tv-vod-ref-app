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
