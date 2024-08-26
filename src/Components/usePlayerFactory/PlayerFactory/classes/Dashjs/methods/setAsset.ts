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

function setAsset(this: Dashjs, media: Media): void {
  console.log(Dashjs.name, setAsset.name, media);

  this.player = this.player.then((player) => {
    console.log(Dashjs.name, setAsset.name, media);

    if (player.isReady()) {
      player.reset();
      console.debug(Dashjs.name, setAsset.name, "player reset");
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
    console.debug(Dashjs.name, setAsset.name, "settings updated");

    const drmConfig = createDrmConfig(media);
    if (drmConfig != null) {
      player.setProtectionData(drmConfig);
      console.debug(
        Dashjs.name,
        setAsset.name,
        "protection data set",
        drmConfig
      );
    }

    const playbackTime = getPlaybackTime();
    player.attachView(getVideoElement());
    player.attachSource(media.url, playbackTime);
    console.log(Dashjs.name, setAsset.name, "playback start @", playbackTime);

    return player;
  });
}

export default setAsset;
