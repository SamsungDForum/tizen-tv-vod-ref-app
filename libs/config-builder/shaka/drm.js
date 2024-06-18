/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const keySystem = {
  // key system -> drm name
  "org.w3.clearkey": "org.w3.clearkey",
  "com.widevine.alpha": "com.widevine.alpha",
  "com.microsoft.playready": "com.microsoft.playready",
  "com.youtube.playready": "com.microsoft.playready",
};

function fromType({ drmType, licenseServerURL }) {
  return keySystem[drmType] && { servers: { [keySystem[drmType]]: licenseServerURL } };
}

function fromKeySystems(keySystems) {
  return keySystem[keySystems[0]] && { preferredKeySystems: [keySystem[keySystems[0]]] };
}

function fromPreference({ system }) {
  return { preferredKeySystems: [system] };
}

export { fromType, fromKeySystems, fromPreference };
