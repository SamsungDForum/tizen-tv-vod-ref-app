/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export function firstUniqueID(array) {
  const uniqueObjects = {};

  for (const obj of JSON.parse(array)) {
    const id = obj.id;

    if (!uniqueObjects[id]) {
      uniqueObjects[id] = obj;
    }
  }
  const uniqueObjectsArray = Object.values(uniqueObjects);
  return uniqueObjectsArray;
}
