/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Subtitle } from "../../../../utils/playAssetCurrentTypes";
import Shaka from "../";

const changeCurrentSubtitles = function(this: Shaka, subtitles: Subtitle): void {
  this.player = this.player.then(player => new Promise(res => {
    if (subtitles.category == 'off') {
      player.setTextTrackVisibility(false);
    } else {
      player.selectTextLanguage(subtitles.category);
      player.setTextTrackVisibility(true);
    }
    res(player);
  }));
}

export default changeCurrentSubtitles;