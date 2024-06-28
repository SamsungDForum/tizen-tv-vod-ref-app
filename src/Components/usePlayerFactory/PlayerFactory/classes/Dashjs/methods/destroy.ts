/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Dashjs from "../";

function closePlayer(this: Dashjs, player: dashjs.MediaPlayerClass) {
  console.debug(Dashjs.name, closePlayer.name, "unregister request filter");

  player.unregisterLicenseRequestFilter(this.licenseRequest);
  this.licenseRequestHeaders = null;
  player.destroy();

  return player;
}

const destroy = function (this: Dashjs): Promise<any> {
  console.debug(Dashjs.name, "destroy");

  this.player = this.player.then((player) => closePlayer.call(this, player));
  return this.player;
};

export default destroy;
