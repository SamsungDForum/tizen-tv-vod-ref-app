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
import { Destructible } from "../interfaces/Destructible";
import { getVideoElement } from "./classes/utils/getVideoElement";
import { store, unuseMediaBundle } from "../utils/playAsset";

class PlayerFactory {
  private constructor() {}

  private static player: Destructible | null;

  public static create(config: PlayerConfig | undefined) {
    if(config?.type === undefined) {
      return null;
    }

    console.log(PlayerFactory.name, config.type, 'has been created');
    if (config.type === 'shaka') {
      const player = new Shaka(config);
      PlayerFactory.player = player;
      return player;
    } else if (config.type === 'bitmovin') {
      const player = new Bitmovin(config);
      PlayerFactory.player = player;
      return player;
    } else if (config.type === 'hlsjs') {
      const player = new Hlsjs(config);
      PlayerFactory.player = player;
      return player;
    } else if (config.type === 'dashjs') {
      const player = new Dashjs(config);
      PlayerFactory.player = player;
      return player;
    }
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