/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Shaka from "../";

const changeCurrentAudio = function(this: Shaka, audio: Audio): void {
this.player = this.player.then(player => new Promise(res => {
      player.selectAudioLanguage(audio.category);
      res(player);
    }
  ));  
};

export default changeCurrentAudio;