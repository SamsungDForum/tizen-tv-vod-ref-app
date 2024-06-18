/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { subtitle as subtitleDispatch } from "../../../utils/setting";

type Event = Parameters<dashjs.Events.QualityChangeRenderedCallback>[0];

function onSubtitleChanged(event: Event, player: dashjs.MediaPlayerClass): void {
  if (event.mediaType === 'text') {
    const index = player.getCurrentTextTrackIndex();
    const textTracks = player.getTracksFor('text');
    const currentTrack = textTracks[index];

    subtitleDispatch({ current: currentTrack.lang, list: null });
  }
}

export default onSubtitleChanged;