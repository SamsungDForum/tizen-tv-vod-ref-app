/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = Parameters<dashjs.Events.QualityChangeRenderedCallback>[0];

function onVideoQualityChanged(event: Event, player: dashjs.MediaPlayerClass) {
  const { mediaType, newQuality } = event;
  if(mediaType === 'video') {
    const track = player.getCurrentTrackFor('video')!;
    const { bitrateList, mimeType } = track;
    const current = `${mimeType.split('/')[1]} ${bitrateList[newQuality].width} x ${bitrateList[newQuality].height}`;
    videoQualityDispatch({current, list: null});
  }
}

export default onVideoQualityChanged;