/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useEffect } from "react";
import styles from "./AdvancedContent.module.scss";
import { VideoFrameInfo } from "./info";
import { MemoryGraph } from "./ChartsComponents/MemoryGraph";
import { Details } from "./ChartsComponents/ChartTypes";
import { useStateEvent } from "../../../../../libs/native-event";
import { resourceMonitor, eventTypeMonitor } from "../../../../../libs/resource-monitor";
import { CpuGraph } from "./ChartsComponents/CpuGraph";
import { ErrorOccurred } from "./ErrorOccurred";
import { isTizenSupported } from "../../../../../libs/resource-buffer/isTizenSupported";
import { useTypedSelector } from "../../../../reduxStore/useTypedSelector";
import { useResourceMonitor, unuseResourceMonitor } from "../../../../../libs/resource-monitor/resourceMonitorHandlers";

export default function GraphsSection() {
  const [ev]: [CustomEvent<Details> | any] = useStateEvent(resourceMonitor, eventTypeMonitor);

  const isChartTracking = useTypedSelector((state) => state.ChartConfig.isTracking);

  useEffect(() => {
    useResourceMonitor();
    if (!isChartTracking) return unuseResourceMonitor;
  }, [isChartTracking]);

  return (
    <div className={styles.advOptionContainer}>
      <MemoryGraph ev={ev} width={400} height={300} />
      <div className={styles.advOptionSectionContainer}>
        <div style={{ width: "300px" }}>
          <div className={styles.advOptionLabelContainer}>Video frames</div>
          <VideoFrameInfo ev={ev} />
        </div>
      </div>
      <div className={styles.advOptionSectionContainer}>
        <div className={styles.advOptionLabelContainer}>CPU Usage</div>
        <div className={styles.pieCharContainer}>
          {isTizenSupported ? (
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
  );
}
