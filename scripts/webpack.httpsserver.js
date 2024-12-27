/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

//server value needs to be edited for proper certificate path
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
    type: "https",
    options: {
      ca: "../ssl-cert/tizenweb-livetvapp-reference-cert/rootCA.pem",
      cert: "../ssl-cert/tizenweb-livetvapp-reference-cert/privateKey/onsite.crt",
      key: "../ssl-cert/tizenweb-livetvapp-reference-cert/privateKey/onsite.key",
    },
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

module.exports = {
  devServer: devServer,
};
