/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("node:path");
const sdb = require("./lib/sdb");
const device = require("./lib/device-config");
const { scriptArgs } = require("./lib/common");
const { getConfig } = require("./lib/application");
const { devtools } = require("./lib/devtools-launcher");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const { packageId, packageName } = getConfig().pvod;

  // Connect to target
  const serialNo = await sdb.connect(deviceConfig.target);

  // Launch app and attach devtools
  await devtools(serialNo, packageId, packageName, deviceConfig);
})();
