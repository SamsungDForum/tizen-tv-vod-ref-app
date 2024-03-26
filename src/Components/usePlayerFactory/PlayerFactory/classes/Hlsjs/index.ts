import type { IPlayer } from "../../../interfaces/IPlayer";
import type { PlayerConfig } from "../../../types/PlayerConfig";
import { changeCurrentAudio, changeCurrentSubtitles, changeCurrentVideoQuality, createPlayer, destroy, load, setAsset } from "./methods";
import { Audio, KeySystem, Media, Quality, Subtitle } from "../../../utils/playAssetCurrentTypes";
import { Loadable } from "../../../interfaces/Loadable";
import EventManager from "../../../EventManager";
import { Destructible } from "../../../interfaces/Destructible";
import { EventEnum, publish } from "../../../utils/event";

class Hlsjs implements IPlayer, Loadable, Destructible {
  public player: Promise<hlsjs.HlsjsInstance>;

  constructor(readonly config: PlayerConfig) {
    this.player = this.load()
      .then(() => this.createPlayer())
      .then(player => { 
        EventManager.registerEvents(player, 'hlsjs');
        
        // For integration tests
        publish(EventEnum.HLSJSPlayer, player);
        return player;
      });
  }
 
  load: () => Promise<any>
    = load;

  createPlayer: () => Promise<hlsjs.HlsjsInstance> 
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

export default Hlsjs;