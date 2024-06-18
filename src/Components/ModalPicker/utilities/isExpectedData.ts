/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function isExpectedData(data: any): boolean {
  if(Array.isArray(data)) {
    if(data.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  return false;
}

export default isExpectedData;