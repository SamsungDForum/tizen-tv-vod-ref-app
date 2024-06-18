/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("node:path");
const package = require("./lib/package");
const { scriptArgs, httpOpen, errorExit, serverHotReload } = require("./lib/common");
const { devtools } = require("./lib/devtools-launcher");
const device = require("./lib/device-config");
const sdb = require("./lib/sdb");
const tizen = require("./lib/tizen");
const colour = require("./lib/colour");
const { getConfig } = require("./lib/application");

const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const url = args.sourceUrl ?? serverHotReload();
  const bootstrapPackage = getConfig().bootstrap;

  if (args.sourceUrl) {
    // Custom sourceURL may not be "visible" from server side. Skip check.
    console.warn(tag, url, "Custom source url. Skipping running server check");
  } else {
    // Check if dev server is running.
    if (!(await httpOpen(url))) {
      errorExit(2, tag, colour.red, "Error", colour.reset, "Make sure server is running");
    }
  }

  // Connect to target device
  const serialNo = await sdb.connect(deviceConfig.target);

  // Package loader
  const loaderRoot = path.join(process.env.INIT_CWD, ".loaderapp");
  const packagePath = path.join(loaderRoot, "out");
  const [appId, appName, wgtPath] = await package.pack(loaderRoot, packagePath, deviceConfig, bootstrapPackage, url);

  // Uninstall application
  await sdb.uninstall(serialNo, appId);

  // Install application
  await tizen.install(serialNo, wgtPath);

  // Launch app and attach devtools
  await devtools(serialNo, appId, appName, deviceConfig);
})();
