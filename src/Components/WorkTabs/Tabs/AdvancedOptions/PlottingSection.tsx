/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useMemo } from "react";
import styles from "./AdvancedOptions.module.scss";
import { useStateEvent } from "../../../../../libs/native-event";
import { eventTypeMonitor, resourceMonitor } from "../../../../../libs/resource-monitor";
import MemoryPlot from "./Plots/MemoryPlot";
import CpuPlot from "./Plots/CpuPlot";

export default function PlottingSection() {
  const [ev] = useStateEvent(resourceMonitor, eventTypeMonitor);

  return useMemo(() => {
    return (
      <div className={styles.advOptionContainer}>
        <MemoryPlot ev={ev as CustomEvent} width={600} height={300} />
        <CpuPlot ev={ev as CustomEvent} width={600} height={300} />
      </div>
    );
  }, [ev]);
}
