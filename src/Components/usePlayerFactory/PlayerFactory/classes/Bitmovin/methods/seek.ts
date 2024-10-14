/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Bitmovin from "..";
import { getVideoElement } from "../../utils/getVideoElement";

function seekPlayer(player: Bitmovin) {
  if (player.pendingSeekPos != player.currentSeekPos) {
    console.debug(seekPlayer.name, "bitmovin seek to:", player.pendingSeekPos);

    if (!player.playerInstance?.seek(player.pendingSeekPos, "app")) {
      console.debug(seekPlayer.name, "bitmovin seek to", player.pendingSeekPos, "failed");
      player.pendingSeekPos = -1;
    }
  }

  player.seekId = -1;
}

/*
Bitmovin seeking is sourced from video element's seek event. Calling playerInstance.seek will generate new
seek event. Issue player seek request only if pendingSeekPos and currentSeekPos differ.
Seek position is trimmed down to second values. Sub second seeks do not always result in same currentTime values.
*/
export function onVideoSeek(this: Bitmovin, _ev: Event) {
  clearTimeout(this.seekId);
  this.pendingSeekPos = getVideoElement().currentTime >> 0;
  console.debug(onVideoSeek.name, "pending seek:", this.pendingSeekPos, "current seek:", this.currentSeekPos);

  this.seekId = window.setTimeout(seekPlayer, 0, this);
}

export function onVideoSeeked(this: Bitmovin, _ev: Event) {
  this.currentSeekPos = -1;
}

type PlayerSeekEvent = bitmovin.Events.SeekEvent;

export function onPlayerSeek(this: Bitmovin, ev: PlayerSeekEvent) {
  this.currentSeekPos = ev.seekTarget;
  console.debug(onPlayerSeek.name, "current seek:", this.currentSeekPos);
}
