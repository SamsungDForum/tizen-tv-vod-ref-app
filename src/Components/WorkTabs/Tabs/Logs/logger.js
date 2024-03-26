"strict mode";

import * as Files from "../../../Storages/Files";
import { consoleLogs } from "./log-source";

export function saveLogs() {
  const logs = consoleLogs().map((log) => log.dataLine);

  if (typeof tizen !== "undefined") {
    Files.createLogFile(logs.join("\n"));
  } else {
    var data = new Blob([logs.join("\n")], { type: "text/json" });
    var logURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement("a");
    tempLink.href = logURL;
    tempLink.setAttribute("download", `refapp_${Files.getCurrentTime()}.log`);
    tempLink.click();
  }
}
