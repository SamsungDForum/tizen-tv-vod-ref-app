"strict mode";

import * as Files from "../Storages/Files";
import { consoleLogs } from "../WorkTabs/Tabs/Logs/log-source";

export function saveFavourites(favClips) {
  if (typeof tizen !== "undefined") {
    Files.createClipsFile(favClips);
  } else {
    const jsonString = JSON.stringify(favClips, null, 2);
    var data = new Blob([jsonString], { type: "text/json" });
    var favURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement("a");
    tempLink.href = favURL;
    tempLink.setAttribute("download", `VideoContent.json`);
    tempLink.click();
  }
}
