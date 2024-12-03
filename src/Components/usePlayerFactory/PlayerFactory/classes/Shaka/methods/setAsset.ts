/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { KeySystem, Media } from "../../../../utils/playAssetCurrentTypes";
import { getShakaConfigBuilder } from "../utils/getShakaConfigBuilder";
import Shaka from "../";
import { getPlaybackTime } from "../../../../utils/playAsset";
import { getVideoElement } from "../../utils/getVideoElement";

function setAsset(this: Shaka, media: Media, keySystem?: KeySystem): void {
  console.log(`${Shaka.name}: setAsset()`, media);

  const mediaAsset: Media = Object.create(media);
  const keySystemAsset: KeySystem | undefined = keySystem && Object.create(keySystem);
  this.licenseRequestHeaders = mediaAsset.licenseRequestHeaders;

  this.player = this.player.then((player) => {
    const playerInstance = player;

    return Promise.resolve()
      .then(playerInstance.unload(false))
      .then(() => {
        const abrEnabled = playerInstance.getConfiguration().abr.enabled;
        playerInstance.resetConfiguration();

        const builder = getShakaConfigBuilder()
          .setDrm(mediaAsset)
          .setAssetDrmPreferences(mediaAsset)
          .setDrmPreference(keySystemAsset)
          .setAbr(abrEnabled);

        if (!playerInstance.configure(builder.config)) {
          throw new Error(`malformed configuration ${builder.config}`);
        }

        const playbackTime = getPlaybackTime();
        console.log("Continue watching:", playbackTime);
        return playerInstance.load(mediaAsset.url, playbackTime, mediaAsset.contentType);
      })
      .then(() => getVideoElement().play())
      .catch((err) => {
        console.error(Shaka.name, setAsset.name, err);
      })
      .then(() => playerInstance);
  });
}

export default setAsset;
