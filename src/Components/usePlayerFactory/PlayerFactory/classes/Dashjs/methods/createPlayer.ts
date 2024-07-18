/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Dashjs from "../";

const createPlayer = function (this: Dashjs): Promise<dashjs.MediaPlayerClass> {
  console.log(Dashjs.name, "playerCreate");
  return Promise.resolve(window.dashjs!.MediaPlayer().create());
};

export default createPlayer;
