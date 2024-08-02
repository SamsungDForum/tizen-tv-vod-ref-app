/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from ".././AdvancedContent.module.scss";
import Pie from "../Charts/PieGraph";
import { ChartProps } from "./ChartTypes";

export function CpuGraph({ ev, height, width, innerRadius, outerRadius }: ChartProps) {
  if (ev.detail?.tizen?.cpuUsage == undefined) return null;

  const tizenInfo = ev.detail.tizen;
  const cpuUsageText = tizenInfo.cpuUsage.toString() + " %";

  const cpuData = [
    {
      date: cpuUsageText,
      value: tizenInfo.cpuUsage,
      stroke: "rgba(255, 99, 132, 1)",
      color: "rgba(255, 99, 132, 0.7)",
    },
    {
      date: "",
      value: 100,
      stroke: "rgba(54, 162, 235, 1)",
      color: "rgba(54, 162, 235, 0.7)",
    },
  ];

  return (
    <div className={styles.pieCharContainer}>
      <div className={styles.pieInfo}>
        <div className={styles.pieDropped}>{cpuUsageText}</div>
      </div>
      <Pie data={cpuData} width={width} height={height} innerRadius={innerRadius} outerRadius={outerRadius} />
    </div>
  );
}
