/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Shaka from "../";

async function closePlayer(this: Shaka, player: shaka.ShakaInstance) {
  console.debug(Shaka.name, closePlayer.name, "unregister request filter");

  player.getNetworkingEngine().unregisterRequestFilter(this.networkRequest);
  this.licenseRequestHeaders = null;

  await player.destroy();
  console.debug(Shaka.name, closePlayer.name, "player destroyed");

  return player;
}

function destroy(this: Shaka): Promise<any> {
  console.debug(Shaka.name, "destroy");

  this.player = this.player.then((player) => closePlayer.call(this, player));
  return this.player;
}

export default destroy;
