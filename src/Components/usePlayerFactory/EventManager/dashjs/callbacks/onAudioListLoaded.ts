/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioListLoaded(event: Event, player: dashjs.MediaPlayerClass) {
  const audioTracks = player.getTracksFor('audio');
  const categories: string[] = [];
  audioTracks.forEach(track => {
    if (categories.indexOf(track.codec) === -1) {
      categories.push(track.codec);
    }
  });

  const result: {
    category: string;
    options: string[];
  }[] = categories.map(category => (
    {
      category: category,
      options: [],
    }
  ));

  categories.forEach(category => {
    audioTracks.forEach(track => {
      if (track.codec === category) {
        let index = result.findIndex(item => item.category === category);
        result[index].options.push(track.lang);
      }
    });
  });

  result.forEach(item => {
    item.category = item.category.match(/codecs="(.+?)"/)![1];
  });

  audioDispatch({ current: 'default', list: result });
  console.log("playbackMetaDataLoaded", event);
}

export default onAudioListLoaded;