/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Dashjs from "../";

const changeCurrentAudio = function(this: Dashjs, audio: Audio): void {
  this.player = this.player.then(player => new Promise(res => {
    const targetAudio = player
      .getTracksFor("audio")
      .find(track => track.lang === audio.option && track.codec.includes(audio.category));

    if(targetAudio != null) {
      player.setCurrentTrack(targetAudio);
    }
    res(player);
  }));
};

export default changeCurrentAudio;