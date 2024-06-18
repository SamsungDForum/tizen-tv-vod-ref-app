/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { subtitle as subtitleDispatch } from '../../../utils/setting';

type Event = { [key: string]: any };

function onSubtitleChanged(event: Event, player: hlsjs.HlsjsInstance): void {
  const { id } = event;

  const currentSubtitle = player.subtitleTracks.find(track => track.id === id);
  subtitleDispatch({ current: currentSubtitle.lang, list: null });
}

export default onSubtitleChanged;