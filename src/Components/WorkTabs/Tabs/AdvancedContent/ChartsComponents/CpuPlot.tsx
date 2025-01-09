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

function CpuPlot({ width, height }: PlotProps) {
  const timeFrame = useTypedSelector((state) => state.ChartConfig.plotterTimeFrame);
  const cpuData = bufferPlotter.cpu;
  const chartData = cpuData.slice(0, 30 * timeFrame + 1);

  return (
    <div style={{ marginLeft: "50px" }}>
      <div className={styles.plotTitle}>
        <h3>CPU usage (%)</h3>
      </div>
      <div className={styles.plotAreaCpu}>
        <LineChart chartData={[...chartData]} width={width} height={height} yScaleSize={{ yLow: 0, yHigh: 100 }} />
      </div>
    </div>
  );
}

export default CpuPlot;
