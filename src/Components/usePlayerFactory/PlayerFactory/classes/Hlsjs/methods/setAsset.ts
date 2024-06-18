/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Media } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";
import { getPlaybackTime } from "../../../../utils/playAsset";

const setAsset = function(this: Hlsjs, media: Media): void {
  console.log(`${Hlsjs.name}: setAsset()`, media);
  this.player = this.player.then(player => new Promise(res => {

    const playbackTime = getPlaybackTime();
    player.config.startPosition = playbackTime;
    console.log('Continuous watching:', playbackTime);
    player.loadSource(media.url);
    res(player);
  }));
}

export default setAsset;