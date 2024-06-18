/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
