/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { IPlayer } from "../../../interfaces/IPlayer";
import type { PlayerConfig } from "../../../types/PlayerConfig";
import { changeCurrentAudio, changeCurrentSubtitles, changeCurrentVideoQuality, createPlayer, destroy, load, setAsset } from "./methods";
import { Audio, KeySystem, Media, Quality, Subtitle } from "../../../utils/playAssetCurrentTypes";
import { Loadable } from "../../../interfaces/Loadable";
import EventManager from "../../../EventManager";
import { Destructible } from "../../../interfaces/Destructible";
import { EventEnum, publish } from "../../../utils/event";

class Shaka implements IPlayer, Loadable, Destructible {
  public player: Promise<shaka.ShakaInstance>;
  
  constructor(readonly config: PlayerConfig) {
    this.player = this.load()
      .then(() => this.createPlayer())
      .then(player => { 
        EventManager.registerEvents(player, 'shaka');

        // For integration tests
        publish(EventEnum.ShakaPlayer, player);
        return player;
      });
  }
  
  load: () => Promise<any> 
    = load;

  createPlayer: () => Promise<shaka.ShakaInstance> 
    = createPlayer;

  setAsset: (media: Media, keySystem: KeySystem) => void 
    = setAsset;

  changeCurrentAudio: (audio: Audio) => void 
    = changeCurrentAudio;

  changeCurrentVideoQuality: (quality: Quality) => void 
    = changeCurrentVideoQuality;

  changeCurrentSubtitles: (subtitiles: Subtitle) => void 
    = changeCurrentSubtitles;

  destroy: () => Promise<any> 
    = destroy;
}

export default Shaka;