/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from ".././AdvancedOptions.module.scss";
import LineChart from "../Charts/LineChart";
import { PlotProps } from "./PlotTypes";

export const chartDataSize = 30;
const chartData: number[] = [];
function MemoryPlot({ ev, width, height }: PlotProps) {
  if (ev?.detail?.tizen?.memoryUsage == undefined) return null;

  if (chartData.length > chartDataSize) chartData.pop();

  const memory = ev.detail.tizen.memoryUsage;
  chartData.unshift(memory);

  // adjusting y scale
  const maxNum = Math.max(...chartData);
  const yHigh = Math.ceil(maxNum / 100) * 100;
  return (
    <div>
      <div className={styles.plotTitle}>
        <h3>Memory usage over 60 seconds (MB)</h3>
      </div>
      <div className={styles.plotAreaMemory}>
        <LineChart chartData={[...chartData]} width={width} height={height} yScaleSize={{ yLow: 0, yHigh: yHigh }} />
      </div>
    </div>
  );
}

export default MemoryPlot;
