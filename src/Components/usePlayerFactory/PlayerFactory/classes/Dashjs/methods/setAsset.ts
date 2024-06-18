/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Media } from "../../../../utils/playAssetCurrentTypes";
import { createDrmConfig } from "../utils/createDrmConfig";
import Dashjs from "../";
import { getPlaybackTime } from "../../../../utils/playAsset";

const setAsset = function(this: Dashjs, media: Media): void {
  console.log(`${Dashjs.name}: setAsset()`, media);
  this.player = this.player.then(player => new Promise(res => {
    const drmConfig = createDrmConfig(media);
    if (drmConfig != null) {
      player.setProtectionData(drmConfig);
    }

    const playbackTime = getPlaybackTime();
    console.log('Continuous watching:', playbackTime);
    player.attachSource(media.url, playbackTime);
    res(player);
  }));
}

export default setAsset;