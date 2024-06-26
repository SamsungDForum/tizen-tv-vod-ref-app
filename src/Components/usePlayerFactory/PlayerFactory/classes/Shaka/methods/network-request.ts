/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Shaka from "../";

const networkRequest = function (this: Shaka, type, request, _context): void {
  // https://shaka-player-demo.appspot.com/docs/api/shaka.net.NetworkingEngine.html#.RequestType
  if (this.licenseRequestHeaders && type == 2) {
    request.headers = { ...request.headers, ...this.licenseRequestHeaders };
    console.debug(Shaka.name, "networkRequest", type, request);
  }
};

export default networkRequest;
