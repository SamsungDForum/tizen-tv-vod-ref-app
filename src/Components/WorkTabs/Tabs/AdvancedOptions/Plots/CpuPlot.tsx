/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from ".././AdvancedOptions.module.scss";
import LineChart from "../Charts/LineChart";
import { type PlotProps } from "./PlotTypes";
import { chartDataSize } from "./MemoryPlot";

const cpuChartData: number[] = [];
function CpuPlot({ ev, width, height }: PlotProps) {
  if (ev?.detail?.tizen?.cpuUsage == undefined) return null;

  if (cpuChartData.length > chartDataSize) cpuChartData.pop();

  cpuChartData.unshift(ev.detail.tizen.cpuUsage);

  return (
    <div style={{ marginLeft: "50px" }}>
      <div className={styles.plotTitle}>
        <h3>CPU usage over 60 seconds (%)</h3>
      </div>
      <div className={styles.plotAreaCpu}>
        <LineChart chartData={[...cpuChartData]} width={width} height={height} yScaleSize={{ yLow: 0, yHigh: 100 }} />
      </div>
    </div>
  );
}

export default CpuPlot;
