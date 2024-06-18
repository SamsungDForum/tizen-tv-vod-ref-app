/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("node:path");
const package = require("./lib/package");
const { scriptArgs } = require("./lib/common");
const device = require("./lib/device-config");
const sdb = require("./lib/sdb");
const tizen = require("./lib/tizen");
const { getConfig } = require("./lib/application");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const packageInfo = getConfig().pvod;

  // Connect to target device
  const serialNo = await sdb.connect(deviceConfig.target);

  // Package bundle
  const loaderRoot = path.join(process.env.INIT_CWD, "dist");
  const packagePath = path.join(process.env.INIT_CWD, "out");
  const [appId, appName, wgtPath] = await package.pack(loaderRoot, packagePath, deviceConfig, packageInfo);

  // Uninstall application
  await sdb.uninstall(serialNo, appId);

  // Install application
  await tizen.install(serialNo, wgtPath);

  // Launch application in non debug mode
  await sdb.run(serialNo, appId, appName);
})();
