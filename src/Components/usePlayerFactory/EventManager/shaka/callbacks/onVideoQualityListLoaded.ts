/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

function onVideoQualityListLoaded(player: shaka.ShakaInstance) {
  const qualities = player.getVariantTracks();
  const mimeTypes: any = [];
  qualities.forEach(quality => {
    if (mimeTypes.indexOf(quality.mimeType.replace("video/", "")) === -1) {
      mimeTypes.push(quality.mimeType.replace("video/", ""));
    }
  });

  const resolutions: any = [];
  qualities.forEach(quality => {
    let item = `${quality.width} x ${quality.height}`;
    if (resolutions.indexOf(item) === -1) {
      resolutions.push(item);
    }
  });

  const list: any = [];
  mimeTypes.forEach(mimeType => {
    list.push({ category: mimeType, options: [] });
  });

  qualities.forEach(quality => {
    let item = `${quality.width} x ${quality.height}`;
    let targetObj = list.find(item => item.category === quality.mimeType.replace("video/", ""));
    if (targetObj.options.indexOf(item) === -1) {
      targetObj.options.push(item);
    }
  });

  videoQualityDispatch({ current: 'auto', list });
}

export default onVideoQualityListLoaded;