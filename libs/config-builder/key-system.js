/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const keySystemNames = {
  "org.w3.clearkey": "clearkey",
  "com.widevine.alpha": "widevine",
  "com.microsoft.playready": "playready",
  "com.youtube.playready": "YT playready",
};

function nameKeySystem(systemName) {
  return keySystemNames[systemName];
}

function preferredKeySystems(builder) {
  return builder.drmKeySystems.map(nameKeySystem);
}

export { nameKeySystem, preferredKeySystems };
