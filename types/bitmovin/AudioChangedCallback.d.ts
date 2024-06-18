/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace bitmovin.Events {
  type AudioPrefix<Str extends string> = `audio/${Str}`;

  interface AudioInfo {
    getQualities: () => object;
    id: AudioPrefix<string>;
    label: string;
    lang: string;
    role: undefined | Array<{
      schemeIdUri: string;
      value: string;
    }>
  }

  interface AudioChangedEvent {
    type: Extract<MediaPlayerEvent, 'audiochanged'>;
    time: number;
    timestamp: number;
    sourceAudio: AudioInfo;
    targetAudio: AudioInfo;
  }

  export type AudioChangedCallback = (event: AudioChangedEvent) => void;
}