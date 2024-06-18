/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("node:path");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);
  await Promise.all([require("./lib/tools").probe(), require("./lib/tizen").probe()]);
  require("./lib/device-config").probe();
})();
