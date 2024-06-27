/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { sourceConfig } from "../../../configs/player/bitmovin";

const keySystemToName = {
  // key system -> drm name
  "org.w3.clearkey": "clearkey",
  "com.widevine.alpha": "widevine",
  "com.microsoft.playready": "playready",
  "com.youtube.playready": "playready",
};

const keyNameToSystem = {
  // key system -> drm name
  clearkey: "org.w3.clearkey",
  widevine: "com.widevine.alpha",
  playready: "com.microsoft.playready",
};

function fromType({ drmType, licenseServerURL, licenseRequestHeaders }) {
  const systemName = keySystemToName[drmType];
  if (systemName) {
    return licenseRequestHeaders
      ? {
          [systemName]: {
            ...sourceConfig[systemName],
            LA_URL: licenseServerURL,
            headers: { ...licenseRequestHeaders },
          },
        }
      : {
          [systemName]: {
            ...sourceConfig[systemName],
            LA_URL: licenseServerURL,
          },
        };
  }
}

function fromKeySystems(keySystems) {
  const systemName = keySystemToName[keySystems[0]];
  return systemName && { preferredKeySystems: [systemName] };
}

function fromPreference({ name }) {
  return { preferredKeySystems: [name] };
}

export { keySystemToName, keyNameToSystem, fromKeySystems, fromPreference, fromType };
