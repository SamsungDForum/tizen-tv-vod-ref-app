/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { KeySystem, Media } from "../../../../utils/playAssetCurrentTypes";
import { getBitmovinConfigBuilder } from "../utils/getBitmovinConfigBuilder";
import Bitmovin from "../";
import { getPlaybackTime } from "../../../../utils/playAsset";

const setAsset = function (this: Bitmovin, media: Media, keySystem?: KeySystem): void {
  console.log(Bitmovin.name, "setAsset()", media);

  const mediaAsset: Media = Object.create(media);
  const keySystemAsset: KeySystem | undefined = keySystem && Object.create(keySystem);

  this.player = this.player.then((player) => {
    const playerInstance = player;

    return Promise.resolve()
      .then(() => {
        const builder = getBitmovinConfigBuilder()
          .setAssetUrl(mediaAsset)
          .setDrm(mediaAsset)
          .setAssetDrmPreferences(mediaAsset)
          .setDrmPreference(keySystemAsset);

        return playerInstance.load(builder.config);
      })
      .then(() => {
        const playbackTime = getPlaybackTime();
        if (playbackTime > 0) {
          const seekRes = playerInstance.seek(playbackTime);
          console.log("Continue watching:", playbackTime, seekRes);
        }

        return playerInstance.play();
      })
      .catch((err) => {
        console.error(Bitmovin.name, "setAsset()", err);
      })
      .then(() => playerInstance);
  });
};

export default setAsset;
