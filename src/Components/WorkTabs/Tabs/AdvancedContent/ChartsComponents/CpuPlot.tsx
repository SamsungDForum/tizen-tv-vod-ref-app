/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from ".././AdvancedContent.module.scss";
import LineChart from "../Charts/LineChart";
import { type ChartProps } from "./ChartTypes";
import { resourceBuffer } from "../../../../../../libs/resource-buffer";

function CpuPlot({ ev, width, height }: ChartProps) {
  if (ev.detail?.tizen?.cpuUsage === undefined) return null;
  const chartData = resourceBuffer.data.cpuConsumption;

  return (
    <div style={{ marginLeft: "50px" }}>
      <div className={styles.plotTitle}>
        <h3>CPU usage over 60 seconds (%)</h3>
      </div>
      <div className={styles.plotAreaCpu}>
        <LineChart chartData={[...chartData]} width={width} height={height} yScaleSize={{ yLow: 0, yHigh: 100 }} />
      </div>
    </div>
  );
}

export default CpuPlot;
