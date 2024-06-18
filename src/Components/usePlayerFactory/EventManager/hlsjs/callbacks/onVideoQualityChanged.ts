/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onVideoQualityChanged(event: Event, player: hlsjs.HlsjsInstance) {
  const currentLevel = player.levels[event.level];
  const codec = currentLevel.videoCodec;
  const current = `${codec} ${currentLevel.width} x ${currentLevel.height}`;
  videoQualityDispatch({ current, list: null });
}

export default onVideoQualityChanged;