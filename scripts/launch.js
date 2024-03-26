const path = require("node:path");
const sdb = require("./lib/sdb");
const device = require("./lib/device-config");
const { scriptArgs } = require("./lib/common");
const { getConfig } = require("./lib/application");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const args = scriptArgs(__filename);
  const deviceConfig = device.config(args);
  const { packageId, packageName } = getConfig().pvod;

  // Connect to target device
  const serialNo = await sdb.connect(deviceConfig.target);


  // Launch application
  await sdb.run(serialNo, packageId, packageName);
})();
