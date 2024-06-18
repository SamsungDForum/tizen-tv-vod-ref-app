/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Subtitle } from "../../../../utils/playAssetCurrentTypes";
import Bitmovin from "../";

const changeCurrentSubtitles = function(this: Bitmovin, subtitles: Subtitle): void {
  this.player = this.player.then(player => new Promise(res => {
    if (subtitles.category == 'off') {
      player.subtitles
        .list()
        .filter(el => el.enabled)
        .map(el => player.subtitles.disable(el.id));
    } else {
      const targetTrack = player.subtitles
        .list()
        .find(item => item.lang === subtitles.category);
          
      player.subtitles.enable(targetTrack.id, true);
    }
    res(player);
  }));
}

export default changeCurrentSubtitles;