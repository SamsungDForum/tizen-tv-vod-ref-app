/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Bitmovin from "../";
import { getVideoElement } from "../../utils/getVideoElement";

const destroy = function (this: Bitmovin): Promise<any> {
  const videoElement = getVideoElement();
  videoElement.removeEventListener("seeking", this.onVideoSeekCb);
  videoElement.removeEventListener("seeked", this.onVideoSeekedCb);

  clearTimeout(this.seekId);
  this.playerInstance = null;

  this.player = this.player.then(
    (player) =>
      new Promise((res) => {
        player.unload();
        player.destroy();
        res(player);
      })
  );

  return this.player;
};

export default destroy;
