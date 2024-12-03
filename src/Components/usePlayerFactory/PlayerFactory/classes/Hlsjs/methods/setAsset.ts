/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Media } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";
import { getPlaybackTime } from "../../../../utils/playAsset";
import { hlsPromisify } from "../utils/hls-promisify";
import { getVideoElement } from "../../utils/getVideoElement";

function hlsLoadSource(this: hlsjs.HlsjsInstance, url: string) {
  const playbackTime = getPlaybackTime();
  if (playbackTime > 0) {
    console.log(Hlsjs.name, hlsLoadSource.name, "continue watching:", playbackTime);
    this.config.startPosition = playbackTime;
  }

  this.loadSource(url);
}

const setAsset = function (this: Hlsjs, media: Media): void {
  console.log(Hlsjs.name, "setAsset()", media);

  this.player = this.player.then((player) => {
    return hlsPromisify(
      player,
      [window.Hls.Events.MANIFEST_PARSED],
      [window.Hls.Events.ERROR],
      hlsLoadSource,
      media.url
    )
      .then(() => getVideoElement().play())
      .catch((err) => console.error(Hlsjs.name, err))
      .then(() => player);
  });
};

export default setAsset;
