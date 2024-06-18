/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { PlayerType } from "../types/PlayerType";

declare module "redux-states" {
  type Item<T = string, Y = string> = {
    current: T;
    list: Array<Y>;
  }

  type Label<Str extends string = string> = `${PlayerType} ${Str}`
  type SettingList = {
    category: string;
    options: Array<string>;
  }

  export interface SettingState {
    source: {
      current: {
        id: number;
        trackId: number;
        label: Label;
        type: PlayerType;
        version: string;
        args: {
          src: string;
        }
      }
    }
    settingPanel: boolean;
    audio: Item<string, string | SettingList>; 
    subtitle: Item<string, string | SettingList>; 
    videoQuality: Item<string, string | SettingList>;
    keySystem: Item<string, string | SettingList>;
  }
}