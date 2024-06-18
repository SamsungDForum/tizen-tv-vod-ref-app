/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const path = require("path");
const webpackCommonConfig = require("./webpack.common.js");
const tag = [path.parse(__filename).name];

module.exports = (env) => {
  const config = webpackCommonConfig(env);

  if (env.host) {
    config.devServer.host = env.host;
    delete env.host;
  }

  if (env.port) {
    config.devServer.port = env.port;
    delete env.port;
  }

  return config;
};
