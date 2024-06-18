/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getVideoElement } from "../../utils/getVideoElement";
import Hlsjs from "..";

const createPlayer = function(this: Hlsjs): Promise<hlsjs.HlsjsInstance> {
  return new Promise(res => {
    const videoElement = getVideoElement();
    const player = new window.Hls({ startPosition: 0 });
    player.attachMedia(videoElement);
    console.log(`${Hlsjs.name} has been created`);
    res(player);
  });
}

export default createPlayer;