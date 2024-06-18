/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { setSubtitleOverlay } from '../../utils/setting';
import { onAudioChanged, onAudioListLoaded, onSubtitleChanged, onSubtitleListLoaded, onVideoQualityChanged, onVideoQualityListLoaded } from './callbacks';

class BitmovinEventManager {
  private constructor() {}

  static register(player: bitmovin.BitmovinInstance): void {
    player.on("ready", () => onAudioListLoaded(player));
    player.on("ready", () => onVideoQualityListLoaded(player));
    player.on("ready", () => onSubtitleListLoaded(player));
    player.on("cueenter", event => setSubtitleOverlay(event.text));
    player.on("subtitledisabled", () => setSubtitleOverlay(''));
    player.on("audiochanged", event => onAudioChanged(event));
    player.on("videoqualitychanged", event => onVideoQualityChanged(event));
    player.on("subtitleenabled", event => onSubtitleChanged(event));
  }
}

export { BitmovinEventManager };