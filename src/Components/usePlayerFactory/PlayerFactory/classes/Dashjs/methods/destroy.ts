/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Dashjs from "../";

function closePlayer(this: Dashjs, player: dashjs.MediaPlayerClass) {
  console.log(Dashjs.name, closePlayer.name);

  player.destroy();
  console.debug(Dashjs.name, closePlayer.name, "player destroyed");

  return player;
}

function destroy(this: Dashjs): Promise<any> {
  console.debug(Dashjs.name, "destroy");

  this.player = this.player.then((player) => closePlayer.call(this, player));
  return this.player;
}

export default destroy;
