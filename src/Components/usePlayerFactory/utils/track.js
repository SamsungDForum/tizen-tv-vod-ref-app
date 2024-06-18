/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// TODO: Review
// Track is no longer used for playing stream track information but more as a
// 'modal-picker' wrapper element allowing arbitrary data to be displayed and
// selected by a modal picker.

function createTrack(id, label, data) {
  return {
    id: id,
    label: label,
    trackId: id,
    trackData: data,
  };
}

function trackEqual({ trackId: trackIdA }, { trackId: trackIdB }) {
  return trackIdA == trackIdB;
}

export default createTrack;
export { trackEqual };
