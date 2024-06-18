/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Resource } from "./resource";

/** @extends Resource */
export class TizenWebApplication extends Resource {
  /** @type {TizenWebApplicationInfo} */
  appInfo = { memoryUsage: 0, cpuUsage: 0 };

  constructor() {
    super();
  }

  static isSupported() {
    const support = typeof webapis != "undefined" && typeof webapis.appcommon?.getSystemStat != "undefined";

    console.log(Resource.name, TizenWebApplication.name, TizenWebApplication.isSupported.name, support);

    return support;
  }

  static onError(error) {
    console.error(Resource.name, TizenWebApplication.name, TizenWebApplication.onError.name, error);
  }

  onCpu = (stats) => {
    this.appInfo = { ...this.appInfo, ...stats };
  };

  onMemory = (stats) => {
    this.appInfo = { ...this.appInfo, ...stats };
  };

  /** @override */
  request() {
    console.debug(Resource.name, TizenWebApplication.name, this.request.name);
    webapis.appcommon.getSystemStat("CPU", this.onCpu, TizenWebApplication.onError);
    webapis.appcommon.getSystemStat("MEMORY", this.onMemory, TizenWebApplication.onError);
  }

  /** @override @returns {{application: TizenWebApplicationInfo}} */
  get info() {
    /** @type {TizenWebApplicationInfo} */

    return { tizen: { ...this.appInfo } };
  }
}
