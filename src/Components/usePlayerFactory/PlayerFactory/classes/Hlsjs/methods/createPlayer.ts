/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getVideoElement } from "../../utils/getVideoElement";
import Hlsjs from "..";
import { hlsPromisify } from "../utils/hls-promisify";

function hlsAttachMedia(this: hlsjs.HlsjsInstance) {
  this.attachMedia(getVideoElement());
}

const createPlayer = function (this: Hlsjs): Promise<hlsjs.HlsjsInstance> {
  const player = new window.Hls({ debug: true });
  return hlsPromisify(player, [window.Hls.Events.MEDIA_ATTACHED], [window.Hls.Events.ERROR], hlsAttachMedia)
    .catch((err) => console.error(Hlsjs.name, "media attach failed", err))
    .then(() => {
      console.log(Hlsjs.name, "created");
      return player;
    });
};

export default createPlayer;
