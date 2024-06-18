/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Quality } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";

const changeCurrentVideoQuality = function(this: Hlsjs, quality: Quality): void {
  this.player = this.player.then(player => new Promise(res => {
    if(quality.category === 'auto') {
      player.currentLevel = -1;
    } else {
      const videoQualityList = player.levels;
      const [width, height] = quality.option!.split('x');
      const targetTrack = videoQualityList.find(
        item => 
          item.videoCodec === quality.category && 
          item.width === parseInt(width) && 
          item.height === parseInt(height)
      );
      const targetId = videoQualityList.indexOf(targetTrack);
      player.currentLevel = targetId;
    }
    res(player);
  }));
}

export default changeCurrentVideoQuality;