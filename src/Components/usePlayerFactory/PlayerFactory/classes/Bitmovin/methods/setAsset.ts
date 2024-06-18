/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { KeySystem, Media } from "../../../../utils/playAssetCurrentTypes";
import { getBitmovinConfigBuilder } from "../utils/getBitmovinConfigBuilder";
import Bitmovin from "../";
import { getPlaybackTime } from "../../../../utils/playAsset";

const setAsset = function(this: Bitmovin, media: Media, keySystem?: KeySystem): void {
  console.log(`${Bitmovin.name}: setAsset()`, media);
  this.player = this.player.then(player => new Promise(res => {
    const builder = getBitmovinConfigBuilder()
      .setAssetUrl(media)
      .setDrm(media)
      .setAssetDrmPreferences(media)
      .setDrmPreference(keySystem);
    
    const playbackTime = getPlaybackTime();
    console.log('Continuous watching:', playbackTime);
    player.load(builder.config)
      .then(() => player.seek(playbackTime))
      .then(() => res(player));
  }));
}

export default setAsset;