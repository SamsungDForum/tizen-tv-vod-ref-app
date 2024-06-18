/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function createPreviewTilesFromClip(clip) {
  return {
    title: clip.name,
    position: clip.id,
    subtitle: `ID: ${clip.id}`,
    image_ratio: "16by9",
    image_url: clip.poster,
    action_data: `{\"videoId\": ${clip.id}}`,
    is_playable: false
  };
}

export { createPreviewTilesFromClip };