/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const devServer = {
  static: false,
  hot: true,
  compress: true,
  host: "0.0.0.0",
  port: 8081,
  client: {
    logging: "info",
    overlay: true,
  },
  server: {
    type: "http",
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

module.exports = {
  devServer: devServer,
};