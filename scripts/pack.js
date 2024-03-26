const path = require("node:path");
const package = require("./lib/package");
const { scriptArgs } = require("./lib/common");
const device = require("./lib/device-config");
const { getConfig } = require("./lib/application");

const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const packageInfo = getConfig().pvod;

  // Create target package
  const applicationRoot = path.join(process.env.INIT_CWD, "dist");
  const packagePath = path.join(process.env.INIT_CWD, "out");
  await package.pack(applicationRoot, packagePath, deviceConfig, packageInfo);
})();
