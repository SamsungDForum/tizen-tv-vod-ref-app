const path = require("node:path");
const sdb = require("./lib/sdb");
const tizen = require("./lib/tizen");
const device = require("./lib/device-config");
const { scriptArgs, packageFile } = require("./lib/common");
const { getConfig } = require("./lib/application");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const { name, packageId } = getConfig().pvod;
  const wgtPath = packageFile(name, "out");

  // Connect to target device
  const serialNo = await sdb.connect(deviceConfig.target);

  // Uninstall application
  await sdb.uninstall(serialNo, packageId);

  // Install application
  await tizen.install(serialNo, wgtPath);
})();
