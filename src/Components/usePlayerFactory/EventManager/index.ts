import type { PlayerInstance } from "../interfaces/PlayerInstance";
import type { PlayerType } from "../types/PlayerType";
import { BitmovinEventManager } from "./bitmovin";
import { DashjsEventManager } from "./dashjs";
import { HlsjsEventManager } from "./hlsjs";
import { ShakaEventManager } from "./shaka";

class EventManager {
  private constructor() {}

  public static registerEvents<T extends PlayerInstance>(player: T, type: PlayerType): T {
    console.log(EventManager.name, type, "events have been registered");
     switch(type) {
      case 'bitmovin':
        BitmovinEventManager.register(player as bitmovin.BitmovinInstance);
        break;
      case 'dashjs':
        DashjsEventManager.register(player as dashjs.MediaPlayerClass);
        break;
      case 'hlsjs':
        HlsjsEventManager.register(player as hlsjs.HlsjsInstance);
        break;
      case 'shaka':
        ShakaEventManager.register(player as shaka.ShakaInstance);
    }

    return player;
  }
}

export default EventManager;