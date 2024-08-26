/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Dashjs from "../";

const createPlayer = function (this: Dashjs): Promise<dashjs.MediaPlayerClass> {
  console.log(Dashjs.name, "playerCreate");

  const player = window.dashjs!.MediaPlayer().create();
  player.initialize();
  return Promise.resolve(player);
};

export default createPlayer;
