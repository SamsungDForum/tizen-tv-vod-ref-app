/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

function onVideoQualityListLoaded(player: bitmovin.BitmovinInstance) {
  const list = player.getAvailableVideoQualities()
    .map(quality => `${quality.width} x ${quality.height}`);
  
  videoQualityDispatch({ current: 'auto', list });
}

export default onVideoQualityListLoaded;