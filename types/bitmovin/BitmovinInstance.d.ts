/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace bitmovin {
  export interface BitmovinInstance {
    [index: string]: any;
    on(type: MediaPlayerEvent, callback: (...args: any[]) => void): void;
    on(type: 'audiochanged', callback: Events.AudioChangedCallback): void;
    on(type: 'videoqualitychanged', callback: Events.VideoQualityChangedCallback): void;
  }
}

