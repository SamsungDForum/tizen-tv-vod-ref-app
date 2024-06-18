/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare module "redux-states" {
  export interface FiltersState {
    value: {
      SRC: 'All' | 'Azure' | 'Akamai' | 'DASH-IF' | 'Telecom Paris' | 'Verizon';
      DRM: 'All' | 'No DRM' | 'Play Ready' | 'Clear Key' | 'Widevine';
      Container: 'All' | 'Mp4' | 'Webm' | 'Containerless';
      Manifest: 'All' | 'DASH' | 'HLS' | 'MSS';
    }
  }
}