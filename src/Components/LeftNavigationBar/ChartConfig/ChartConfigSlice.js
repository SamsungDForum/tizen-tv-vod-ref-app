/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";
import { resourceBuffer } from "../../../../libs/resource-buffer";
import { saveLogs } from "../../WorkTabs/Tabs/Logs/logger";

const chartDataSize = 30;
export const ChartConfig = createSlice({
  name: "ChartConfig",
  initialState: {
    isTracking: false,
  },
  reducers: {
    setChartTrackState: (state, action) => {
      state.isTracking = action.payload;

      if (state.isTracking) resourceBuffer.start();
      else resourceBuffer.stop();
    },
    setControlBehaviour: (state, action) => {
      switch (action.payload) {
        case "Reset":
          resourceBuffer.reset();
          break;
        case "Save":
          saveLogs();
          break;
      }
    },
  },
});

export const { setChartTrackState, setControlBehaviour } = ChartConfig.actions;

export default ChartConfig.reducer;
