/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs.Events {
  interface QualityChangeRenderedEvent {
    mediaType: MediaType;
    newQuality: number;
    oldQuality: number;
    streamId: string;
    type: 'qualityChangeRendered';
  }

 export type QualityChangeRenderedCallback = (event: QualityChangeRenderedEvent) => void;
}
