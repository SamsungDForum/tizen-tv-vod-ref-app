/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { audio as audioDispatch } from "../../../utils/setting";

type Event = Parameters<bitmovin.Events.AudioChangedCallback>[0];

function onAudioChanged(event: Event) {
  const { id, lang } = event.targetAudio;
  const codecType = id
    .split('/')[1]
    .split('-')[0];

  audioDispatch({ current: `${codecType} ${lang}`, list: null });
}

export default onAudioChanged;