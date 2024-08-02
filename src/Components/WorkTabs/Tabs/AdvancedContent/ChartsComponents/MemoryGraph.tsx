/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { BarChart } from "../Charts/BarChart";
import { bytesToMB } from "../format";
import { type ChartProps } from "./ChartTypes";

type GraphData = {
  name: string;
  value: number;
  color: string;
  stroke: string;
};

export function MemoryGraph({ ev, width, height }: ChartProps) {
  if (ev.detail?.memory == undefined) return null;

  const graphData: GraphData[] = [];

  const { totalJSHeapSize, usedJSHeapSize, jsHeapSizeLimit } = ev.detail.memory;
  if (ev.detail.memory) {
    graphData.push({
      name: `total`,
      value: bytesToMB(totalJSHeapSize),
      color: "rgb(54, 162, 235)",
      stroke: "rgb(54, 162, 235)",
    });

    graphData.push({
      name: `used`,
      value: bytesToMB(usedJSHeapSize),
      color: "rgb(255, 99, 132)",
      stroke: "rgb(255, 99, 132)",
    });

    graphData.push({
      name: `limit`,
      value: bytesToMB(jsHeapSizeLimit),
      color: "rgb(54, 162, 235)",
      stroke: "rgb(54, 162, 235)",
    });
  }

  if (ev.detail?.tizen) {
    graphData.push({
      name: `mem`,
      value: ev.detail.tizen.memoryUsage,
      color: "rgb(255, 99, 132)",
      stroke: "rgb(255, 99, 132)",
    });
  }

  if (graphData.length == 0) return null;

  return <BarChart data={graphData} width={width} height={height} />;
}
