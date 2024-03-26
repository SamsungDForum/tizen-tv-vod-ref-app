import { Resource } from "./resource";

/** @extends Resource */
export class VideoQuality extends Resource {
  /** @override @returns {{Object.<string, Object.<string, number>>}} */
  get info() {
    let playbackQualities = {};

    let vnode = document.querySelectorAll("video")[0];
    let quality = vnode.getVideoPlaybackQuality();
    playbackQualities.videoQuality = {
      droppedVideoFrames: quality.droppedVideoFrames,
      totalVideoFrames: quality.totalVideoFrames,
    };

    return playbackQualities;
  }
}
