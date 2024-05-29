import React, { useEffect, useState } from "react";
import styles from "./AdvancedOptions.module.scss";
import { resourceMonitor, eventTypeMonitor } from "../../../../../libs/resource-monitor";
import { useStateEvent } from "../../../../../libs/native-event/use-event";
import { BarChart } from "./Charts/BarChart";
import Pie from "./Charts/PieGraph";
import { MemoryInfo, VideoFrameInfo } from "./info";
import { MemoryGraph, CpuUsageGraph } from "./graph";

import { formatBytes } from "./format";

function unuseResourceMonitor() {
  resourceMonitor.unuse();
}

function useResourceMonitor() {
  resourceMonitor.use();
  return unuseResourceMonitor;
}

export default function AdvancedOptions() {
  const [ev] = useStateEvent(resourceMonitor, eventTypeMonitor);

  useEffect(useResourceMonitor, []);

  return (
    <div className={styles.advOptionContainer}>
      <div className={styles.advOptionSectionContainer}>
        <div style={styles.advInfo}>
          <div className={styles.advOptionLabelContainer}>Memory</div>
          <MemoryInfo data={ev} />
        </div>
        <div className={styles.barCharContainer}>
          <MemoryGraph data={ev} width={400} height={300} />
        </div>
      </div>

      <div className={styles.advOptionSectionContainer}>
        <div style={styles.advInfo}>
          <div className={styles.advOptionLabelContainer}>Video frames</div>
          <VideoFrameInfo data={ev} />
        </div>
      </div>

      <div className={styles.advOptionSectionContainer}>
        <div style={styles.advInfo}>
          <div className={styles.advOptionLabelContainer}>CPU Usage</div>
          <div className={styles.pieCharContainer}>
            <CpuUsageGraph data={ev} width={210} height={210} innerRadius={0} outerRadius={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
