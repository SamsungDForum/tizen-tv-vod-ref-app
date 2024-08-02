/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import styles from "./AdvancedContent.module.scss";
import { MemoryInfo, VideoFrameInfo } from "./info";
import { ErrorOccurred } from "./ErrorOccurred";
import { MemoryGraph } from "./ChartsComponents/MemoryGraph";
import { CpuGraph } from "./ChartsComponents/CpuGraph";
import { Details } from "./ChartsComponents/ChartTypes";
import { unuseResourceMonitor, useResourceMonitor } from "../../../../../libs/resource-monitor/resourceMonitorHandlers";
import { useStateEvent } from "../../../../../libs/native-event";
import { eventTypeMonitor, resourceMonitor } from "../../../../../libs/resource-monitor";
import { useTypedSelector } from "../../../../reduxStore/useTypedSelector";

export default function GraphsSection() {
  const isChartTracking = useTypedSelector((state) => state.ChartConfig.isTracking);
  const [ev]: [CustomEvent<Details> | any] = useStateEvent(resourceMonitor, eventTypeMonitor);

  useEffect(() => {
    useResourceMonitor();
    if (!isChartTracking) return unuseResourceMonitor;
  }, [isChartTracking]);

  const isTizenDeviceData = ev.detail?.tizen != undefined;
  return (
    <div className={styles.advOptionContainer}>
      <div className={styles.advOptionSectionContainer}>
        <div>
          <div className={styles.advOptionLabelContainer}>Memory</div>
          <MemoryInfo data={ev} />
        </div>
        <div className={styles.barCharContainer}>
          <MemoryGraph ev={ev} width={400} height={300} />
        </div>
      </div>

      <div className={styles.advOptionSectionContainer}>
        <div style={{ width: "300px" }}>
          <div className={styles.advOptionLabelContainer}>Video frames</div>
          <VideoFrameInfo data={ev} />
        </div>
      </div>

      <div className={styles.advOptionSectionContainer}>
        <div>
          <div className={styles.advOptionLabelContainer}>CPU Usage</div>
          <div className={styles.pieCharContainer}>
            {isTizenDeviceData ? (
              <CpuGraph ev={ev} width={210} height={210} innerRadius={0} outerRadius={100} />
            ) : (
              <ErrorOccurred
                size="25%"
                explainMsg="This error occurred because the device is using an insufficient version of Tizen"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
