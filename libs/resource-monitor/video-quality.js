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
