const path = require("node:path");
const package = require("./lib/package");
const { scriptArgs } = require("./lib/common");
const { devtools } = require("./lib/devtools-launcher");
const tizen = require("./lib/tizen");
const device = require("./lib/device-config");
const sdb = require("./lib/sdb");
const { getConfig } = require("./lib/application");

const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const packageInfo = getConfig().pvod;

  // Connect to target device
  const serialNo = await sdb.connect(deviceConfig.target);

  // Create target package
  const applicationRoot = path.join(process.env.INIT_CWD, "dist");
  const packagePath = path.join(process.env.INIT_CWD, "out");
  const [appId, appName, wgtPath] = await package.pack(applicationRoot, packagePath, deviceConfig, packageInfo);

  // Uninstall application
  await sdb.uninstall(serialNo, appId);

  // Install application
  await tizen.install(serialNo, wgtPath);

  // Launch app and attach devtools
  await devtools(serialNo, appId, appName, deviceConfig);
})();
