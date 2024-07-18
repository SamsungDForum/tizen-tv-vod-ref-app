/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Media } from "../../../../utils/playAssetCurrentTypes";
import { createDrmConfig } from "../utils/createDrmConfig";
import Dashjs from "../";
import { getPlaybackTime } from "../../../../utils/playAsset";
import { getVideoElement } from "../../utils/getVideoElement";

const setAsset = function (this: Dashjs, media: Media): void {
  console.log(Dashjs.name, "setAsset", media);
  this.player = this.player.then((player) => {
    this.licenseRequestHeaders = media.licenseRequestHeaders;

    if (player.isReady()) {
      player.reset();
      console.debug(Dashjs.name, "setAsset", "player reset");
    }

    player.updateSettings({
      streaming: {
        trackSwitchMode: {
          video: "alwaysReplace",
        },
        buffer: {
          flushBufferAtTrackSwitch: true,
          fastSwitchEnabled: false,
        },
      },
    });
    console.debug(Dashjs.name, "setAsset", "settings updated");

    const drmConfig = createDrmConfig(media);
    if (drmConfig != null) {
      player.setProtectionData(drmConfig);
      console.debug(Dashjs.name, "setAsset", "protection data set", drmConfig);
    }

    const playbackTime = getPlaybackTime();
    console.log(Dashjs.name, "setAsset", "continue watching @", playbackTime);
    player.initialize(getVideoElement(), media.url, true, playbackTime);

    console.log(Dashjs.name, "setAsset", "player initialized");

    return player;
  });
};

export default setAsset;
