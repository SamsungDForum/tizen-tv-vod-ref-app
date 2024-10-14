/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getBitmovinConfig } from "../utils/getBitmovinConfig";
import { getVideoElement } from "../../utils/getVideoElement";
import Bitmovin from "../";

const createPlayer = function (this: Bitmovin): Promise<bitmovin.BitmovinInstance> {
  const config = getBitmovinConfig();
  const videoElement = getVideoElement();

  this.playerInstance = new window.bitmovin!.player.Player(videoElement.parentElement!, config);
  this.playerInstance.setVideoElement(videoElement);
  this.playerInstance.on("seek", this.onPlayerSeekCb);

  videoElement.addEventListener("seeking", this.onVideoSeekCb);
  videoElement.addEventListener("seeked", this.onVideoSeekedCb);

  console.log(`${Bitmovin.name} has been created`);

  return Promise.resolve(this.playerInstance);
};

export default createPlayer;
