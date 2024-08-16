import { saveLogs } from "../../src/Components/WorkTabs/Tabs/Logs/logger";

let _canSave = true;
// if data exceeded threshold auto save files with logs and consumptioned resources
export function saveFilesWhenThresholdExceeded(
  memUsage: number,
  cpuUsage: number
) {
  const memThreshold = Number(localStorage.getItem("memoryThreshold") ?? 350);
  const cpuThreshold = Number(localStorage.getItem("cpuThreshold") ?? 75);

  if (memThreshold <= memUsage && _canSave) {
    _canSave = false;
    saveLogs();
    setTimeout(() => (_canSave = true), 30000);
    throw new Error("MEMORY Threshold Exceeded");
  }
  if (cpuThreshold <= cpuUsage && _canSave) {
    _canSave = false;
    saveLogs();
    setTimeout(() => (_canSave = true), 30000);
    throw new Error("CPU Threshold Exceeded");
  }
}
