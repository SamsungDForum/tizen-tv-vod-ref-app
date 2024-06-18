/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { loadScript } from "../../utils/loadScript";
import Hlsjs from "..";

const load = function(this: Hlsjs): Promise<any> {
  return loadScript(this.config.args.src);
}

export default load;