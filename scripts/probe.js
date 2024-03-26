const path = require("node:path");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);
  await Promise.all([require("./lib/tools").probe(), require("./lib/tizen").probe()]);
  require("./lib/device-config").probe();
})();
