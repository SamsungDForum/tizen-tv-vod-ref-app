/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace hlsjs {
  export interface HlsjsInstance {
    [index: string]: any;
    on(type: MediaPlayerEvent, callback: (event: MediaPlayerEvent, data: any) => void): void;
  }
}
