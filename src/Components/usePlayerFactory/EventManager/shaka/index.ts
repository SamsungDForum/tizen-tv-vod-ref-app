/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { onAudioChanged, onAudioListLoaded, onSubtitleChanged, onSubtitleListLoaded, onVideoQualityChanged, onVideoQualityListLoaded } from "./callbacks";

class ShakaEventManager {
  private constructor() {}

  static register(player: shaka.ShakaInstance) {
    const evtManager: shaka.EventManager | null = ShakaEventManager.getEventManager();
    if(!evtManager) {
      return;
    }

    evtManager.listen(player, 'manifestparsed', () => onAudioListLoaded(player));
    evtManager.listen(player, 'manifestparsed', () => onVideoQualityListLoaded(player));
    evtManager.listen(player, 'manifestparsed', () => onSubtitleListLoaded(player));
    evtManager.listen(player, 'variantchanged', event => onAudioChanged(event));
    evtManager.listen(player, 'variantchanged', event => onVideoQualityChanged(event));
    evtManager.listen(player, 'textchanged', () => onSubtitleChanged(player));
  }

  private static getEventManager(): shaka.EventManager | null {
    if(window?.shaka == null) {
      return null;
    }

    return new window.shaka.util.EventManager();
  }
}

export { ShakaEventManager };