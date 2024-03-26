import { createSlice } from "@reduxjs/toolkit";

const savedState = sessionStorage.getItem("logsState");

export const starterLogFilters = ["log", "warn", "error", "debug", "info"];

export const LogOverlayScreen = createSlice({
  name: "LogOverlayScreen",
  initialState: {
    autoscroll: true,
    stringArray: starterLogFilters,
    showPlayerLogs: savedState ? JSON.parse(savedState) : false,
  },
  reducers: {
    toggleShowPlayerLogs: (state, action) => {
      state.showPlayerLogs = action.payload;
      sessionStorage.setItem("logsState", JSON.stringify(state.showPlayerLogs));
    },
    toggleAutoscroll: (state, action) => {
      state.autoscroll = action.payload;
    },
    toogleActiveFilters: (state, action) => {
      state.stringArray = action.payload;
    },
    toggleFilters: (state, action) => {
      state.stringArray = action.payload;
    },
  },
});

export const { toogleActiveFilters, toggleFilters, toggleAutoscroll, toggleShowPlayerLogs } = LogOverlayScreen.actions;

export default LogOverlayScreen.reducer;
