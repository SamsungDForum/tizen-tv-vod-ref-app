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
} from "./methods";
import { Audio, KeySystem, Media, Quality, Subtitle } from "../../../utils/playAssetCurrentTypes";
import { Loadable } from "../../../interfaces/Loadable";
import EventManager from "../../../EventManager";
import type { Destructible } from "../../../interfaces/Destructible";
import { EventEnum, publish } from "../../../utils/event";
import { onVideoSeek, onVideoSeeked, onPlayerSeek } from "./methods/seek";

type PlayerSeekEvent = bitmovin.Events.SeekEvent;

class Bitmovin implements IPlayer, Loadable, Destructible {
  public player: Promise<bitmovin.BitmovinInstance>;
  public playerInstance: bitmovin.BitmovinInstance | null = null;

  constructor(readonly config: PlayerConfig) {
    this.createPlayer = createPlayer.bind(this);
    this.onVideoSeekCb = onVideoSeek.bind(this);
    this.onVideoSeekedCb = onVideoSeeked.bind(this);
    this.onPlayerSeekCb = onPlayerSeek.bind(this);

    this.player = this.load()
      .then(this.createPlayer)
      .then((player) => {
        EventManager.registerEvents(player, "bitmovin");

        // For integration tests
        publish(EventEnum.BitmovinPlayer, player);
        return player;
      });
  }

  load: () => Promise<any> = load;

  createPlayer: (this: Bitmovin) => Promise<bitmovin.BitmovinInstance>;

  setAsset: (media: Media, keySystem: KeySystem) => void = setAsset;

  changeCurrentAudio: (audio: Audio) => void = changeCurrentAudio;

  changeCurrentVideoQuality: (quality: Quality) => void = changeCurrentVideoQuality;

  changeCurrentSubtitles: (subtitles: Subtitle) => void = changeCurrentSubtitles;

  destroy: () => Promise<any> = destroy;

  currentSeekPos: number = -1;
  pendingSeekPos: number = -1;
  seekId: number = -1;

  onVideoSeekCb: (this: Bitmovin, _ev: Event) => void;
  onVideoSeekedCb: (this: Bitmovin, _ev: Event) => void;
  onPlayerSeekCb: (this: Bitmovin, ev: PlayerSeekEvent) => void;
}

export default Bitmovin;
