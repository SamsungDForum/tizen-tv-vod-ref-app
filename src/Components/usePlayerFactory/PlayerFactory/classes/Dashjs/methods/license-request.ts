/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Dashjs from "../";

function licenseRequest(this: Dashjs, request): Promise<void> {
  // Sample implementation
  // https://reference.dashif.org/dash.js/nightly/samples/drm/license-wrapping.html
  if (this.licenseRequestHeaders) {
    request.headers = { ...request.headers, ...this.licenseRequestHeaders };
    console.debug(Dashjs.name, licenseRequest.name, request);
  }

  return Promise.resolve();
}

export default licenseRequest;
