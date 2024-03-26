import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    actionType: null,
    showConfirm: false,
  },
  reducers: {
    actionTypeConfirmation: (state, action) => {
      return { ...state, actionType: action.payload };
    },

    showConfirmation: (state, action) => {
      return { ...state, showConfirm: action.payload };
    },
  },
});

export const { actionTypeConfirmation, showConfirmation } = ModalSlice.actions;

export default ModalSlice.reducer;
