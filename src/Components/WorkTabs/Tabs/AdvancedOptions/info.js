/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./AdvancedOptions.module.scss";
import { bytesToMB } from "./format";

export function MemoryInfo(props) {
  if (props.data?.detail == undefined) return null;

  const detail = props.data.detail;
  const infoData = [];

  if (detail.memory != undefined) {
    infoData.push({ name: "JS heap total:", value: bytesToMB(detail.memory.totalJSHeapSize).toString()+" MB" });
    infoData.push({ name: "JS heap used:", value: bytesToMB(detail.memory.usedJSHeapSize).toString()+" MB" });
    infoData.push({ name: "JS heap limit:", value: bytesToMB(detail.memory.jsHeapSizeLimit).toString()+" MB" });
  }

  if (detail.tizen) {
    infoData.push({ name: "Tizen mem:", value: detail.tizen.memoryUsage.toString() + " MB" });
  }

  if (infoData.length == 0) return null;

  return (
    <>
      {infoData.map((info, infoId) => (
        <div key={info.name + info.value}>
          <div className={styles.divInside}>{info.name}</div> <span>{info.value}</span>
        </div>
      ))}
    </>
  );
}

export function VideoFrameInfo(props) {
  if (props.data?.detail?.videoQuality == undefined) return null;

  const quality = props.data.detail.videoQuality;

  return (
    <>
      <div className={styles.divInside}>Dropped:</div> <span>{`${quality.droppedVideoFrames.toLocaleString()}`}</span>
      <div className={styles.divInside}>Total:</div> <span>{`${quality.totalVideoFrames.toLocaleString()}`} </span>
    </>
  );
}
