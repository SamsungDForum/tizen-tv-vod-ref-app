/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import styles from "./AdvancedContent.module.scss";
import MemoryPlot from "./ChartsComponents/MemoryPlot";
import CpuPlot from "./ChartsComponents/CpuPlot";
import { isTizenSupported } from "../../../../../libs/resource-buffer/isTizenSupported";
import { useStateEvent } from "../../../../../libs/native-event";
import { eventTypeMonitor, resourceMonitor } from "../../../../../libs/resource-monitor";

export default function PlottingSection() {
  useStateEvent(resourceMonitor, eventTypeMonitor);
  if (isTizenSupported) {
    return (
      <div className={styles.advOptionContainer}>
        <MemoryPlot width={600} height={300} />
        <CpuPlot width={600} height={300} />
      </div>
    );
  } else return null;
}
