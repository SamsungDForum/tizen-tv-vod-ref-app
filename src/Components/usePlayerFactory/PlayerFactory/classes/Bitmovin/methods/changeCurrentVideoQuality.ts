/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Quality } from "../../../../utils/playAssetCurrentTypes";
import Bitmovin from "../";

const changeCurrentVideoQuality = function(this: Bitmovin, quality: Quality): void {
  this.player = this.player.then(player => new Promise(res => {
    if(quality.category === 'auto') {
      player.setVideoQuality('auto');
    } else {
      const qualityList = player.getAvailableVideoQualities();
      const [width, height] = quality.category.split('x');
      const targetTrack = qualityList
        .find(item => item.width === parseInt(width) && item.height === parseInt(height));
        
      player.setVideoQuality(targetTrack.id);
    }
    res(player);
  }));
}

export default changeCurrentVideoQuality;