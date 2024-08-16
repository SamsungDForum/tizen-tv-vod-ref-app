/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type TizenDetailsType = {
  cpuUsage: number;
  memoryUsage: number;
};
export type Details = {
  tizen?: TizenDetailsType;
  memory?: {
    totalJSHeapSize: number;
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  videoQuality: {
    droppedVideoFrames: number;
    totalVideoFrames: number;
  };
};
export type GraphProps = {
  ev: CustomEvent<Details>;
  width: number;
  height: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type PlotProps = {
  width: number;
  height: number;
};
