/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/** Base class for resource implementation */
export class Resource {
  /** 
   * Base function reporting resource support status
   * @returns {boolean}
   */
  static isSupported() {
    return true;
  }

  /**
   * Base getter returning resource information
   * @return {any}
   */
  get info() {
    return undefined;
  }

  /** Base function requesting resource */
  request() {}
}
