/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { subtitle as subtitleDispatch } from "../../../utils/setting";

function onSubtitleListLoaded(player: shaka.ShakaInstance) {
  const list =  player.getTextLanguagesAndRoles()
    .map(item => item.language);

  subtitleDispatch({ current: 'off', list });
}

export default onSubtitleListLoaded;