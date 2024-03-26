import type { IPlayer } from "../../../interfaces/IPlayer";
import type { PlayerConfig } from "../../../types/PlayerConfig";
import { changeCurrentAudio, changeCurrentSubtitles, changeCurrentVideoQuality, createPlayer, destroy, load, setAsset } from "./methods";
import { Audio, KeySystem, Media, Quality, Subtitle } from "../../../utils/playAssetCurrentTypes";
import { Loadable } from "../../../interfaces/Loadable";
import EventManager from "../../../EventManager";
import type { Destructible } from "../../../interfaces/Destructible";
import { EventEnum, publish } from "../../../utils/event";

class Bitmovin implements IPlayer, Loadable, Destructible {
  public player: Promise<bitmovin.BitmovinInstance>;
  
  constructor(readonly config: PlayerConfig) {
    this.player = this.load()
      .then(() => this.createPlayer())
      .then(player => { 
        EventManager.registerEvents(player, 'bitmovin');

        // For integration tests
        publish(EventEnum.BitmovinPlayer, player);
        return player;
      });
  }

  load: () => Promise<any> 
    = load;

  createPlayer: () => Promise<bitmovin.BitmovinInstance>
    = createPlayer;

  setAsset: (media: Media, keySystem: KeySystem) => void
    = setAsset;

  changeCurrentAudio: (audio: Audio) => void 
    = changeCurrentAudio;

  changeCurrentVideoQuality: (quality: Quality) => void 
    = changeCurrentVideoQuality;

  changeCurrentSubtitles: (subtitles: Subtitle) => void 
    = changeCurrentSubtitles;

  destroy: () => Promise<any>
    = destroy;
}

export default Bitmovin;