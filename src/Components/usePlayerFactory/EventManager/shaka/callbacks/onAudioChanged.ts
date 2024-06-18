/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioChanged(event: Event) {
  const { oldTrack, newTrack } = event;
  const { language, audioId } = newTrack;
  const { audioId: oldAudioId } = oldTrack;

  if (audioId !== oldAudioId) {
    audioDispatch({ current: language, list: null }); 
  }
}

export default onAudioChanged;