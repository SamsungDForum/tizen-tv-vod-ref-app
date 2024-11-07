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

  const mediaAsset: Media = Object.create(media);

  this.player = this.player.then((player) => {
    console.log(Dashjs.name, setAsset.name, mediaAsset);

    const playerInstance = player;

    return Promise.resolve()
      .then(() => {
        if (playerInstance.isReady()) {
          playerInstance.reset();
          console.debug(Dashjs.name, setAsset.name, "player reset");
        }

        playerInstance.updateSettings({
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

        const drmConfig = createDrmConfig(mediaAsset);
        if (drmConfig != null) {
          playerInstance.setProtectionData(drmConfig);
          console.debug(Dashjs.name, setAsset.name, "protection data set", drmConfig);
        }

        const playbackTime = getPlaybackTime();
        playerInstance.attachView(getVideoElement());
        playerInstance.attachSource(mediaAsset.url, playbackTime);
        console.log(Dashjs.name, setAsset.name, "playback start @", playbackTime);
      })
      .catch((err) => {
        console.error(Dashjs.name, setAsset.name, err);
      })
      .then(() => playerInstance);
  });
}

export default setAsset;
