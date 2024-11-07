/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getVideoElement } from "../../utils/getVideoElement";
import Shaka from "../";

const createPlayer = function (this: Shaka): Promise<shaka.ShakaInstance> {
  return new Promise((res) => {
    const videoElement = getVideoElement();
    const player = new window.shaka.Player(videoElement);

    if (window.shaka.polyfill && window.shaka.polyfill.installAll) {
      window.shaka.polyfill.installAll();
    }

    player.addEventListener("error", this.onErrorCb);
    console.log(`${Shaka.name} has been created`);
    res(player);
  });
};

export default createPlayer;
