/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { subtitle as subtitleDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onSubtitleListLoaded(event: Event, player: dashjs.MediaPlayerClass): void {
  if (event.tracks.length === 0) {
    subtitleDispatch({ list: [], current: 'off' });
    return;
  }
  subtitleDispatch({ list: event.tracks.map(track => track.lang), current: 'off' });
  player.setTextTrack(-1);
}

export default onSubtitleListLoaded;