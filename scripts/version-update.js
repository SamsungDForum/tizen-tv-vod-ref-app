const path = require("node:path");
const { getVersionInfo, setVersionInfo, getConfig } = require("./lib/application");
const tag = [path.parse(__filename).name];

(async () => {
  console.log(tag);

  const info = getConfig().pvod;
  const app = getVersionInfo();

  if (info.version == app.version) return;

  app.version = info.version;
  setVersionInfo(app);
})();
