import React from "react";
import styles from "./AdvancedOptions.module.scss";
import { BarChart } from "./Charts/BarChart";
import Pie from "./Charts/PieGraph";
import { bytesToMB } from "./format";

export function MemoryGraph(props) {
  if (props.data?.detail == undefined) return null;

  const detail = props.data.detail;
  const graphData = [];

  if (detail.memory) {
    graphData.push({
      name: `total`,
      value: bytesToMB(detail.memory.totalJSHeapSize),
      color: "rgb(54, 162, 235)",
      stroke: "rgb(54, 162, 235)",
    });

    graphData.push({
      name: `used`,
      value: bytesToMB(detail.memory.usedJSHeapSize),
      color: "rgb(255, 99, 132)",
      stroke: "rgb(255, 99, 132)",
    });

    graphData.push({
      name: `limit`,
      value: bytesToMB(detail.memory.jsHeapSizeLimit),
      color: "rgb(54, 162, 235)",
      stroke: "rgb(54, 162, 235)",
    });
  }

  if (detail.tizen) {
    graphData.push({
      name: `mem`,
      value: detail.tizen.memoryUsage,
      color: "rgb(255, 99, 132)",
      stroke: "rgb(255, 99, 132)",
    });
  }

  if (graphData.length == 0) return null;

  return <BarChart data={graphData} width={props.width} height={props.height} />;
}

export function VideoFramesGraph(props) {}

export function CpuUsageGraph(props) {
  if (props.data?.detail?.tizen == undefined) return null;

  const tizenInfo = props.data.detail.tizen;
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
      <Pie
        data={cpuData}
        width={props.width}
        height={props.height}
        innerRadius={props.innerRadius}
        outerRadius={props.outerRadius}
      />
    </div>
  );
}
