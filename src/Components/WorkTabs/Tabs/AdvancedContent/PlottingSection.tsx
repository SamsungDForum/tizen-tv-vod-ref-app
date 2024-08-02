/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useMemo } from "react";
import styles from "./AdvancedContent.module.scss";
import MemoryPlot from "./ChartsComponents/MemoryPlot";
import CpuPlot from "./ChartsComponents/CpuPlot";
import { type Details } from "./ChartsComponents/ChartTypes";
import { useStateEvent } from "../../../../../libs/native-event";
import { resourceMonitor, eventTypeMonitor } from "../../../../../libs/resource-monitor";

export default function PlottingSection() {
  const [ev]: [CustomEvent<Details> | any] = useStateEvent(resourceMonitor, eventTypeMonitor);

  return useMemo(() => {
    return (
      <div className={styles.advOptionContainer}>
        <MemoryPlot ev={ev} width={600} height={300} />
        <CpuPlot ev={ev} width={600} height={300} />
      </div>
    );
  }, [ev]);
}
