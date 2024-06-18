/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
