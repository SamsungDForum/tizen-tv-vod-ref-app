/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { PlayerConfig } from "../types/PlayerConfig";
import Bitmovin from "./classes/Bitmovin";
import Dashjs from "./classes/Dashjs";
import Hlsjs from "./classes/Hlsjs";
import Shaka from "./classes/Shaka";
import { getVideoElement } from "./classes/utils/getVideoElement";
import { store, unuseMediaBundle } from "../utils/playAsset";
import { IPlayer } from "../interfaces/IPlayer";

class PlayerFactory {
  private constructor() {}

  private static player: Shaka | Bitmovin | Hlsjs | Dashjs | null;

  public static create(config: PlayerConfig | undefined) {
    if (!PlayerFactory.player) {
      if (!config?.type) {
        throw new Error(`${PlayerFactory.name} player type not specified`);
      }

      if (config.type === "shaka") {
        PlayerFactory.player = new Shaka(config);
      } else if (config.type === "bitmovin") {
        PlayerFactory.player = new Bitmovin(config);
      } else if (config.type === "hlsjs") {
        PlayerFactory.player = new Hlsjs(config);
      } else if (config.type === "dashjs") {
        PlayerFactory.player = new Dashjs(config);
      } else {
        throw new Error(
          `${PlayerFactory.name} unsupported player type '${config.type}`
        );
      }
    }

    return PlayerFactory.player as IPlayer;
  }

  public static destroy(): Promise<any> {
    return Promise.resolve()
      .then(() => {
        const time = getVideoElement().currentTime;
        store(time);
        unuseMediaBundle();
      })
      .then(() => PlayerFactory.player!.destroy())
      .then(() => {
        PlayerFactory.player = null;
        console.log(PlayerFactory.name, "player has been destroyed");
      });
  }
}

export default PlayerFactory;
