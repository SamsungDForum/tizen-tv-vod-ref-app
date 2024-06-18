/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onVideoQualityChanged(event: Event) {
  const { oldTrack, newTrack } = event;
  const { width, height, mimeType, videoId } = newTrack;
  const { videoId: oldVideoId } = oldTrack;

  if (videoId !== oldVideoId) {
    const current = `${mimeType.split('/')[1]} ${width} x ${height}`;
    videoQualityDispatch({ current, list: null});
  }
}

export default onVideoQualityChanged;