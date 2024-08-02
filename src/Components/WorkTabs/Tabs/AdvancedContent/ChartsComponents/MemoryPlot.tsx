/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from ".././AdvancedContent.module.scss";
import LineChart from "../Charts/LineChart";
import { ChartProps } from "./ChartTypes";
import { resourceBuffer } from "../../../../../../libs/resource-buffer";

function MemoryPlot({ ev, width, height }: ChartProps) {
  if (ev.detail?.tizen?.memoryUsage === undefined) return null;
  const chartData = resourceBuffer.data.memoryConsumption;

  // adjusting y scale
  const maxNum = chartData.length === 0 ? 100 : Math.max(...chartData);
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
