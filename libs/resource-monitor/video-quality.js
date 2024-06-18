/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Resource } from "./resource";

/** @extends Resource */
export class VideoQuality extends Resource {
  static isSupported() {
    const vnode = document.querySelectorAll("video")[0];
    const support = typeof vnode.getVideoPlaybackQuality != "undefined";

    console.log(Resource.name, VideoQuality.name, VideoQuality.isSupported.name, support);

    return support;
  }
  /** @override @returns {{Object.<string, Object.<string, number>>}} */
  get info() {
    const playbackQualities = {};

    const vnode = document.querySelectorAll("video")[0];
    const quality = vnode.getVideoPlaybackQuality();
    playbackQualities.videoQuality = {
      droppedVideoFrames: quality.droppedVideoFrames,
      totalVideoFrames: quality.totalVideoFrames,
    };

    return playbackQualities;
  }
}
