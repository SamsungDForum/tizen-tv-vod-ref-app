/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { IPlayer } from "../../../interfaces/IPlayer";
import type { PlayerConfig } from "../../../types/PlayerConfig";
import {
  changeCurrentAudio,
  changeCurrentSubtitles,
  changeCurrentVideoQuality,
  createPlayer,
  destroy,
  load,
  setAsset,
  licenseRequest,
} from "./methods";
import {
  Audio,
  KeySystem,
  Media,
  Quality,
  Subtitle,
} from "../../../utils/playAssetCurrentTypes";
import { Loadable } from "../../../interfaces/Loadable";
import EventManager from "../../../EventManager";
import { Destructible } from "../../../interfaces/Destructible";
import { EventEnum, publish } from "../../../utils/event";

class Dashjs implements IPlayer, Loadable, Destructible {
  public player: Promise<dashjs.MediaPlayerClass>;
  public licenseRequestHeaders: {} | null | undefined = null;

  constructor(readonly config: PlayerConfig) {
    this.player = this.load()
      .then(() => this.createPlayer())
      .then((player) => {
        EventManager.registerEvents(player, "dashjs");

        console.debug(Dashjs.name, "registering license request filter");
        player.registerLicenseRequestFilter(this.licenseRequest);

        // For integration tests
        publish(EventEnum.DashJSPlayer, player);
        return player;
      });
  }

  licenseRequest: (request) => Promise<void> = licenseRequest.bind(this);

  load: () => Promise<any> = load;

  createPlayer: () => Promise<dashjs.MediaPlayerClass> = createPlayer;

  setAsset: (media: Media, keySystem: KeySystem) => void = setAsset;

  changeCurrentAudio: (audio: Audio) => void = changeCurrentAudio;

  changeCurrentVideoQuality: (quality: Quality) => void =
    changeCurrentVideoQuality;

  changeCurrentSubtitles: (subtitles: Subtitle) => void =
    changeCurrentSubtitles;

  destroy: () => Promise<any> = destroy;
}

export default Dashjs;
