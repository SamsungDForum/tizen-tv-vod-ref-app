/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Bitmovin from "..";

const changeCurrentAudio = function(this: Bitmovin, audio: Audio): void {
  this.player = this.player.then(player => new Promise(res => {
    const audioList = player.getAvailableAudio();
    const targetAudio = audioList.find(item => item.lang === audio.option && item.id.includes(audio.category));
    player.setAudio(targetAudio.id);
    res(player);
  }))
};

export default changeCurrentAudio;