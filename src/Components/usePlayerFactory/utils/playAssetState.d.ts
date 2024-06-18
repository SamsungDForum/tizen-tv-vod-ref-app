/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { 
  type Audio,
  type KeySystem,
  type Media,
  type Quality,
  type Subtitle
} from "./playAssetCurrentTypes";

declare module "redux-states" {
  export interface PlayAssetState {
    value: {
      audio?: Audio;
      keySystem?: KeySystem;
      media?: Media;
      quality?: Quality;
      subtitle?: Subtitle;
    }
    playbackTime: number | null;
  }
}