/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace shaka {
  export type MediaPlayerEvent =
  | 'abrstatuschanged'
  | 'adaptation'
  | 'buffering'
  | 'complete'
  | 'downloadfailed'
  | 'downloadheadersreceived'
  | 'drmsessionupdate'
  | 'emsg'
  | 'error'
  | 'expirationupdated'
  | 'firstquartile'
  | 'gapjumped'
  | 'keystatuschanged'
  | 'loaded'
  | 'loading'
  | 'manifestparsed'
  | 'manifestupdated'
  | 'mediaqualitychanged'
  | 'metadata'
  | 'midpoint'
  | 'ratechange'
  | 'segmentappended'
  | 'sessiondata'
  | 'stalldetected'
  | 'started'
  | 'statechanged'
  | 'streaming'
  | 'textchanged'
  | 'texttrackvisibility'
  | 'thirdquartile'
  | 'timelineregionadded'
  | 'timelineregionenter'
  | 'timelineregionexit'
  | 'trackschanged'
  | 'unloading'
  | 'variantchanged';
}