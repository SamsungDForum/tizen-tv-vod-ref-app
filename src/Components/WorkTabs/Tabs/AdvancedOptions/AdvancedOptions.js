import React, { useEffect, useState } from "react";
import styles from "./AdvancedOptions.module.scss";
import { resourceMonitor, eventTypeMonitor } from "../../../../../libs/resource-monitor";
import { useStateEvent } from "../../../../../libs/native-event/use-event";
import { BarChart } from "./Charts/BarChart";
import Pie from "./Charts/PieGraph";

function unuseResourceMonitor() {
  resourceMonitor.unuse();
}

function useResourceMonitor() {
  resourceMonitor.use();
  return unuseResourceMonitor;
}

export default function AdvancedOptions() {
  const [{ detail }] = useStateEvent(resourceMonitor, eventTypeMonitor);

  const [droppedFrames, setDroppedFrames] = useState(0);
  const [totalFrames, setTotalFrames] = useState(1);

  const [totalBytes, setTotalBytes] = useState(0);
  const [usedBytes, setUsedBytes] = useState(1);
  const [limitBytes, setLimitBytes] = useState(0);

  function formatBytes(a, showExt, b = 2) {
    if (!+a) return "0";
    const c = 0 > b ? 0 : b,
      d = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
      showExt ? ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d] : ""
    }`;
  }

  const data = [
    {
      date: "dropped",
      value: droppedFrames,
      stroke: "rgba(255, 99, 132, 1)",
      color: "rgba(255, 99, 132, 0.7)",
    },
    {
      date: "total",
      value: totalFrames === 0 ? 1 : totalFrames,
      stroke: "rgba(54, 162, 235, 1)",
      color: "rgba(54, 162, 235, 0.7)",
    },
  ];

  const data2 = [
    {
      name: `Used Bytes`,
      value: formatBytes(usedBytes, false),
      color: "rgb(255, 99, 132)",
      stroke: "rgb(255, 99, 132)",
    },
    {
      name: `Total Bytes`,
      value: formatBytes(totalBytes, false),
      color: "rgb(54, 162, 235)",
      stroke: "rgb(54, 162, 235)",
    },
  ];

  useEffect(() => {
    setDroppedFrames(detail?.videoQuality.droppedVideoFrames);
    setTotalFrames(detail?.videoQuality.totalVideoFrames);
    setTotalBytes(detail?.memory.totalJSHeapSize);
    setUsedBytes(detail?.memory.usedJSHeapSize);
    setLimitBytes(detail?.memory.jsHeapSizeLimit);
  }, [detail]);

  useEffect(useResourceMonitor, []);

  return (
    <div className={styles.advOptionContainer}>
      <div className={styles.advOptionSectionContainer}>
        <div style={styles.advInfo}>
          <div className={styles.advOptionLabelContainer}>Memory</div>
          <div>
            <div className={styles.divInside}>Used:</div> <span>{`${formatBytes(usedBytes, true)}`}</span>
          </div>
          <div>
            <div className={styles.divInside}>Total:</div> <span>{`${formatBytes(totalBytes, true)}`} </span>
          </div>
          <div>
            <div className={styles.divInside}>Limit:</div> <span>{`${formatBytes(limitBytes, true)}`} </span>
          </div>
        </div>

        <div className={styles.barCharContainer}>
          <BarChart data={data2} width={400} height={300} />
        </div>
      </div>

      <div className={styles.advOptionSectionContainer}>
        <div style={styles.advInfo}>
          <div className={styles.advOptionLabelContainer}>Video quality</div>
          <div>
            <div className={styles.divInside}>Dropped frames:</div> <span>{`${droppedFrames?.toLocaleString()}`}</span>
          </div>
          <div>
            <div className={styles.divInside}>Total frames:</div> <span>{`${totalFrames?.toLocaleString()}`} </span>
          </div>
        </div>

        <div className={styles.pieCharContainer}>
          <div className={styles.pieInfo}>
            <div className={styles.pieTotal}>Total</div>
            <div className={styles.pieDropped}>Dropped</div>
          </div>
          <Pie data={data} width={210} height={210} innerRadius={0} outerRadius={100} />
        </div>
      </div>
    </div>
  );
}
