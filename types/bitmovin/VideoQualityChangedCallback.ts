/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace bitmovin.Events {
  interface QualityInfo {
    bitrate: number;
    codec: string;
    height: number;
    id: string;
    label: string;
    width: number;
  }

  interface VideoQualityChangedEvent {
    type: Extract<MediaPlayerEvent, 'videoqualitychanged'>;
    timestamp: number;
    targetQualityId: string;
    sourceQualityId: string;
    sourceQuality: QualityInfo;
    targetQuality: QualityInfo;
  }

  export type VideoQualityChangedCallback = (event: VideoQualityChangedEvent) => void; 
}