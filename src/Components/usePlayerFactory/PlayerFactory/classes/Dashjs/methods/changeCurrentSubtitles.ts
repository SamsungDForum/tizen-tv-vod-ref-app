/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Subtitle } from "../../../../utils/playAssetCurrentTypes";
import Dashjs from "../";

const changeCurrentSubtitles = function(this: Dashjs, subtitles: Subtitle): void {
  this.player = this.player.then(player => new Promise(res => {
    if(subtitles.category === 'off') {
      player.setTextTrack(-1);
      res(player);
      return;
    }

    const track = player.getTracksFor('text')!.find(item => item.lang === subtitles.category)!;
    player.setTextTrack(track.index);
    res(player);
  })); 
}

export default changeCurrentSubtitles;