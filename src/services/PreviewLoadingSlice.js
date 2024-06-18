/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

export const defaultState = {
  queue: [],
  loadingState: 'hidden' 
};

export const PreviewLoading = createSlice({
  name: "PreviewLoading",
  initialState: {
    value: defaultState
  },
  reducers: {
    startPreviewLoading: (state, action) => {
      state.value = {
        queue: [ ...state.value.queue, Date.now()  ],
        loadingState: 'loading'
      }
    },
    setPreviewLoadingState: (state, action) => {
      if(state.value.queue.length === 1 || state.value.queue.length === 0) {
        state.value = {
          queue: [],
          loadingState: action.payload
        }
      } else {
        state.value = {
          queue: state.value.queue.slice(1),
          loadingState: 'loading'
        }
      }
    }
  },
});

export const { startPreviewLoading, setPreviewLoadingState } = PreviewLoading.actions;

export default PreviewLoading.reducer;
