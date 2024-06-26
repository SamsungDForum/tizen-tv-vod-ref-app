/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

const savedCurrentRowID = parseInt(sessionStorage.getItem('currentRowId'));

export const ChannelZapping = createSlice({
  name: "ChannelZapping",
  initialState: {
    channelID: 0,
    channelList: {
      title: '',
      list: []
    },
    currentRowID: savedCurrentRowID ? savedCurrentRowID : 0,
  },
  reducers: {
    setChannelID: (state, action) => {
      state.channelID = action.payload;
    },
    setChannelList: (state, action) => {
      state.channelList = {
        title: action.payload.title,
        list: [...action.payload.list].map(item => item.id)
      };
    },
    setCurrentRowID: (state, action) => {
      state.currentRowID = action.payload;
      sessionStorage.setItem('currentRowId', JSON.stringify(action.payload));
    },
  },
});

export const { setChannelID, setChannelList, setCurrentRowID } = ChannelZapping.actions;

export default ChannelZapping.reducer;
