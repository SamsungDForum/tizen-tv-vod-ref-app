/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

function onVideoQualityListLoaded(player: dashjs.MediaPlayerClass) {
  const videoQualities = player.getTracksFor('video');
  const uniqueCategories: string[] = [];
  videoQualities.forEach(item => {
    if (uniqueCategories.indexOf(item.mimeType) === -1) {
      uniqueCategories.push(item.mimeType);
    }
  });
 
  const result: {
    category: string;
    options: string[];
  }[] = uniqueCategories.map(category => (
    {
      category: category,
      options: [],
    }
  ));

  result.forEach(element => {
    videoQualities.forEach(item => {
      if (item.mimeType === element.category) {
        item.bitrateList.forEach(bitrateItem => {
          element.options.push(`${bitrateItem.width} x ${bitrateItem.height}`);
        })
      }
    })
  })

  result.forEach(element => {
    element.category = element.category.split('/')[1];
  })

  videoQualityDispatch({ current: 'auto', list: result });
}

export default onVideoQualityListLoaded;