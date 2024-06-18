/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
