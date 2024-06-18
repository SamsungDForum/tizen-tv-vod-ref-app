/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioChanged(event: Event) {
  const { mediaType, newMediaInfo } = event;
  if(mediaType === 'audio') {
    const { lang, codec } = newMediaInfo;
    const current = `${codec.match(/codecs="(.+?)"/)[1]} ${lang}`;
    audioDispatch({ current, list: null });
  }
}

export default onAudioChanged;