/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";
import { manageBuffers } from "../../../../libs/resource-buffer";
import { saveLogs } from "../../WorkTabs/Tabs/Logs/logger";

const chartDataSize = 30;
export const ChartConfig = createSlice({
  name: "ChartConfig",
  initialState: {
    isTracking: false,
    plotterTimeFrame: 1 // in minutes
  },
  reducers: {
    setChartTrackState: (state, action) => {
      state.isTracking = action.payload;

      if (state.isTracking) manageBuffers.start();
      else manageBuffers.stop();
    },
    setControlBehaviour: (state, action) => {
      switch (action.payload) {
        case "Reset":
          manageBuffers.reset();
          break;
        case "Save":
          saveLogs();
          break;
      }
    },
    setPlotterTimeFrame: (state, action) => {
      state.plotterTimeFrame = action.payload
    }
  },
});

export const { setChartTrackState, setControlBehaviour, setPlotterTimeFrame } = ChartConfig.actions;

export default ChartConfig.reducer;
