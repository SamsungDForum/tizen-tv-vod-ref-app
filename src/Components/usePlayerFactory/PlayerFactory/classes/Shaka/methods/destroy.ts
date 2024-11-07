/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Shaka from "../";

function closePlayer(this: Shaka, player: shaka.ShakaInstance) {
  console.debug(Shaka.name, closePlayer.name, "unregister request filter");

  player.getNetworkingEngine().unregisterRequestFilter(this.networkRequest);
  this.licenseRequestHeaders = null;

  return player.destroy();
}

function destroy(this: Shaka): Promise<any> {
  console.debug(Shaka.name, "destroy");
  const shakaInstance = this;

  this.player = this.player.then((player) => {
    const playerInstance = player;

    return Promise.resolve()
      .then(() => closePlayer.call(shakaInstance, playerInstance))
      .catch((err) => {
        console.error(Shaka.name, destroy.name, err);
      })
      .then(() => {
        console.debug(Shaka.name, destroy.name, "player destroyed");
        return playerInstance;
      });
  });

  return this.player;
}

export default destroy;
