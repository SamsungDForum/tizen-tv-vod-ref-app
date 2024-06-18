/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type Event = { [key: string]: any };

function onVideoTrackChanged(event: Event, player: dashjs.MediaPlayerClass) {
  const { mediaType, newMediaInfo } = event;
  if(mediaType === 'video') {
    const { requiredQualityIndex } = newMediaInfo;
    const index = typeof requiredQualityIndex === 'number' ? requiredQualityIndex : 0;
    player.setQualityFor('video', index, true);
  }
}

export default onVideoTrackChanged;