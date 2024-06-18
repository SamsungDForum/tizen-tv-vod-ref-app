/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";

const changeCurrentAudio = function(this: Hlsjs, audio: Audio): void {
  this.player = this.player.then(player => new Promise(res => {
    const trackId = player.audioTracks.find(item => item.lang === audio.category).id;
    player.audioTrack = trackId;
    res(player);
  }));  
};

export default changeCurrentAudio;