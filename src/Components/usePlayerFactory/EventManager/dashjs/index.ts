/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { onAudioChanged, onAudioListLoaded, onSubtitleChanged, onSubtitleListLoaded, onVideoQualityChanged, onVideoQualityListLoaded, onVideoTrackChanged } from './callbacks';

class DashjsEventManager {
  private constructor() {}

  static register(player: dashjs.MediaPlayerClass): void {
    player.on('allTextTracksAdded', event => onSubtitleListLoaded(event, player));
    player.on('playbackMetaDataLoaded', event => onAudioListLoaded(event, player));
    player.on('streamInitialized', () => onVideoQualityListLoaded(player));
    player.on('qualityChangeRendered', event => onSubtitleChanged(event, player));
    player.on('trackChangeRendered', event => onAudioChanged(event));
    player.on('trackChangeRendered', event => onVideoTrackChanged(event, player));
    player.on('qualityChangeRendered', event => onVideoQualityChanged(event, player));
  }
}

export { DashjsEventManager };