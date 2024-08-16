/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"strict mode";

import { useTypedSelector } from "../../../../reduxStore/useTypedSelector";
import * as Files from "../../../Storages/Files";
import { consoleLogs } from "./log-source";
import { resourceBuffer } from "../../../../../libs/resource-buffer";
import { RESOURCE_MONITOR_INTERVAL } from "../../../../../libs/resource-monitor";

function generateTableOfUsageData(memory, cpu) {
  let data = "Seconds | Memory consumption (MB) | CPU consumption (%) \n";
  data += "--------|-------------------------|--------------------\n";
  for (let i = 0; i < Math.min(memory.length, cpu.length); i++) {
    const interval = RESOURCE_MONITOR_INTERVAL / 1000;
    const seconds = i * interval;
    const memLength = memory[i].toString().split("").length;

    const displayMem = {
      1: "   " + memory[i],
      2: "  " + memory[i],
      3: " " + memory[i],
      4: memory[i],
    };
    const row = `${seconds} ${seconds > 9 ? "" : " "}     |           ${displayMem[memLength]}          |           ${
      cpu[i]
    } \n`;
    data += row;
  }
  return data;
}

export function saveLogs() {
  const memory = resourceBuffer.data.memoryConsumption;
  const cpu = resourceBuffer.data.cpuConsumption;

  const logs = consoleLogs().map((log) => log.dataLine);
  const resourceConsumption = generateTableOfUsageData(memory, cpu);

  if (typeof tizen !== "undefined") {
    Files.createLogFile(logs.join("\n"));
    if (memory.length > 9) Files.createResourceConsumptionFile(resourceConsumption);
  } else {
    var data = new Blob([logs.join("\n")], { type: "text/json" });
    var logURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement("a");
    tempLink.href = logURL;
    tempLink.setAttribute("download", `refapp_${Files.getCurrentTime()}.log`);
    tempLink.click();
  }
}
