/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getTizenVersion } from "../../libs/tizenFilesystem";

export const reqTizenVersion = (version) => {
  if (typeof tizen !== "undefined") {
    var tizenVersion = parseFloat(getTizenVersion());
    return tizenVersion > version ? true : false;
  } else {
    return true;
  }
};
