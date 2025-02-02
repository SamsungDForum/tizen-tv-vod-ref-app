/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from ".././AdvancedContent.module.scss";
import LineChart from "../Charts/LineChart";
import type { PlotProps } from "./ChartTypes";
import { bufferPlotter } from "../../../../../../libs/resource-buffer";
import { useTypedSelector } from "../../../../../reduxStore/useTypedSelector";

function MemoryPlot({ width, height }: PlotProps) {
  const timeFrame = useTypedSelector((state) => state.ChartConfig.plotterTimeFrame);
  const memoryData = bufferPlotter.memory;
  const chartData = memoryData.slice(0, 30 * timeFrame + 1);

  // adjusting y scale
  const maxNum = chartData.length === 0 ? 100 : Math.max(...chartData);
  const roundMaxNum = Math.ceil(maxNum / 100) * 100;
  const yHigh = roundMaxNum === 0 ? 100 : roundMaxNum;
  return (
    <div>
      <div className={styles.plotTitle}>
        <h3>Memory usage (MB)</h3>
      </div>
      <div className={styles.plotAreaMemory}>
        <LineChart chartData={[...chartData]} width={width} height={height} yScaleSize={{ yLow: 0, yHigh: yHigh }} />
      </div>
    </div>
  );
}

export default MemoryPlot;
